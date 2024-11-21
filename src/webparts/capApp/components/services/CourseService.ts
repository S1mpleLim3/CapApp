import { SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import { ICourse, IUser, ICourseFormData } from "../types";

export class CourseService {
  private sp: SPFI;
  private listName: string = "TrainingData";

  constructor(sp: SPFI) {
    this.sp = sp;
  }

  public async getCourses(): Promise<ICourse[]> {
    try {
      const items = await this.sp.web.lists
        .getByTitle(this.listName)
        .items.select(
          "Id,Title,Description,StartDate,EndDate,AssignedUsers/Id,AssignedUsers/Title"
        )
        .expand("AssignedUsers")();
      return items;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  }

  public async addCourse(course: ICourseFormData): Promise<ICourse> {
    try {
      const result = await this.sp.web.lists
        .getByTitle(this.listName)
        .items.add({
          Title: course.Title,
          Description: course.Description,
          StartDate: course.StartDate,
          EndDate: course.EndDate,
          AssignedUsersId: course.AssignedUsers.map((user) => user.Id),
        });
      return result.data;
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    }
  }

  public async updateCourse(
    id: number,
    course: ICourseFormData
  ): Promise<void> {
    try {
      await this.sp.web.lists
        .getByTitle(this.listName)
        .items.getById(id)
        .update({
          Title: course.Title,
          Description: course.Description,
          StartDate: course.StartDate,
          EndDate: course.EndDate,
          AssignedUsersId: course.AssignedUsers.map((user) => user.Id),
        });
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  }

  public async deleteCourse(id: number): Promise<void> {
    try {
      await this.sp.web.lists
        .getByTitle(this.listName)
        .items.getById(id)
        .delete();
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  }

  public async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await this.sp.web.siteUsers.select("Id,Title,Email")();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}

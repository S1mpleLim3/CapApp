// components/CourseManagement.tsx
import * as React from "react";
import { SPFI } from "@pnp/sp";
import { ICourse, ICourseFormData, IUser } from "../../types";
import { CourseService } from "../../services/CourseService";
import CourseList from "./CourseList";
import CourseForm from "./CourseForm";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";

interface ICourseManagementProps {
  sp: SPFI;
}

const CourseManagement: React.FC<ICourseManagementProps> = ({ sp }) => {
  const [courses, setCourses] = React.useState<ICourse[]>([]);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [editingCourse, setEditingCourse] = React.useState<
    ICourse | undefined
  >();
  const [message, setMessage] = React.useState<{
    text: string;
    type: MessageBarType;
  } | null>(null);

  const courseService = new CourseService(sp);

  const showMessage = (text: string, type: MessageBarType): void => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const loadData = async (): Promise<void> => {
    try {
      const [coursesData, usersData] = await Promise.all([
        courseService.getCourses(),
        courseService.getAllUsers(),
      ]);
      setCourses(coursesData);
      setUsers(usersData);
    } catch (error) {
      showMessage("Error loading data", MessageBarType.error);
      console.log(error);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line no-void
    void loadData();
  }, []);

  const handleCreate = async (data: ICourseFormData): Promise<void> => {
    try {
      await courseService.addCourse(data);
      showMessage("Course created successfully", MessageBarType.success);
      void loadData();
      setShowForm(false);
    } catch (error) {
      showMessage("Error creating course", MessageBarType.error);
      console.log(error);
    }
  };

  const handleUpdate = async (data: ICourseFormData): Promise<void> => {
    try {
      if (editingCourse) {
        await courseService.updateCourse(editingCourse.Id, data);
        showMessage("Course updated successfully", MessageBarType.success);
        void loadData();
        setShowForm(false);
        setEditingCourse(undefined);
      }
    } catch (error) {
      showMessage("Error updating course", MessageBarType.error);
      console.log(error);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await courseService.deleteCourse(id);
      showMessage("Course deleted successfully", MessageBarType.success);
      void loadData();
    } catch (error) {
      showMessage("Error deleting course", MessageBarType.error);
      console.log(error);
    }
  };

  return (
    <div>
      {message && (
        <MessageBar messageBarType={message.type}>{message.text}</MessageBar>
      )}

      <CourseList
        courses={courses}
        onEdit={(course) => {
          setEditingCourse(course);
          setShowForm(true);
        }}
        onDelete={handleDelete}
        onAdd={() => {
          setEditingCourse(undefined);
          setShowForm(true);
        }}
      />

      <CourseForm
        isOpen={showForm}
        onDismiss={() => {
          setShowForm(false);
          setEditingCourse(undefined);
        }}
        onSubmit={editingCourse ? handleUpdate : handleCreate}
        initialData={editingCourse}
        users={users}
      />
    </div>
  );
};

export default CourseManagement;

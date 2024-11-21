// models/ICourse.ts
export interface ICourse {
  Id: number;
  Title: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  AssignedUsers: any[]; // Store user IDs
}

export interface IUser {
  Id: number;
  Title: string;
  Email: string;
}

export interface ICourseFormData {
  Title: string;
  Description: string;
  StartDate: Date;
  EndDate: Date;
  AssignedUsers: any[];
}

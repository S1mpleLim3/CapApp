import * as React from "react";
import CourseManagement from "./CourseManagement";
import { SPFI } from "@pnp/sp";

interface IAdminProps {
  sp: SPFI;
}

const Admin: React.FC<IAdminProps> = ({ sp }) => {
  return (
    <>
      <CourseManagement sp={sp} />
    </>
  );
};

export default Admin;

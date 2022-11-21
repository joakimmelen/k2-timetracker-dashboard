import { Outlet } from "react-router-dom";
import EditNav from "./EditNav";

const Edit = () => {
  return (
    <div className="edit">
      <h1>Edit</h1>
      <EditNav />
      <Outlet />
    </div>
  );
};

export default Edit;

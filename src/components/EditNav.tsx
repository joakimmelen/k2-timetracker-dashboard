import { Link, NavLink } from "react-router-dom";

const EditNav = () => {
  return (
    <div className="edit-nav">
      <div className="edit-nav__items">
        <NavLink
          to="projects"
          className={({ isActive }) =>
            isActive ? "edit-nav-active" : undefined
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="tasks"
          className={({ isActive }) =>
            isActive ? "edit-nav-active" : undefined
          }
        >
          Tasks
        </NavLink>
      </div>
    </div>
  );
};

export default EditNav;

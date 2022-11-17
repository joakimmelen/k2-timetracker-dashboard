import { Link, NavLink } from "react-router-dom";

const OverviewNav = () => {
  return (
    <div className="overview-nav">
      <div className="overview-nav__items">
        <NavLink
          to="projects"
          className={({ isActive }) =>
            isActive ? "overview-nav-active" : undefined
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="tasks"
          className={({ isActive }) =>
            isActive ? "overview-nav-active" : undefined
          }
        >
          Tasks
        </NavLink>
      </div>
    </div>
  );
};

export default OverviewNav;

import { NavLink, useNavigate } from "react-router-dom";

import { navigationItems } from "../config";

const Navbar = () => {
  const useAuth = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return true;
    } else return false;
  };

  const user = useAuth();

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("user");
    navigate("login");
  };

  return (
    <div className="navbar">
      <div className="navbar__items">
        {user && (
          <>
            {navigationItems.navbar.map((item) => (
              <NavLink
                key={item.text}
                className={({ isActive }) =>
                  isActive ? "navbar-active" : undefined
                }
                to={item.to}
              >
                {item.name}
              </NavLink>
            ))}
            {location.pathname !== "/login" && (
              <button onClick={logout}>Log out</button>
            )}
          </>
        )}

        {!user && (
          <NavLink
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined
            }
            to="/login"
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;

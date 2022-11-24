import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navigationItems } from "../config";

const Navbar = () => {
  const [navActive, setNavActive] = useState(false);

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

  const magicHamburger = () => {
    setNavActive(!navActive);
  };

  return user ? (
    <div className={navActive ? "navbar" : "navbar-hidden"}>
      <div className="nerd">
        {navigationItems.navbar.map((item: any) => (
          <NavLink
            onClick={magicHamburger}
            key={item.text}
            className={({ isActive }) =>
              isActive ? "navbar-active" : undefined
            }
            to={item.to}
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      {location.pathname !== "/login" ? (
        <button className="navbutton" onClick={logout}>
          Log out
        </button>
      ) : undefined}
      <div onClick={magicHamburger} className={navActive ? "change" : "icon"}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
    </div>
  ) : (
    <div className="navbar-login">
      <NavLink
        className={({ isActive }) => (isActive ? "navbar-active" : undefined)}
        to="/login"
      >
        Login
      </NavLink>{" "}
    </div>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import classes from "./sideNavBar.module.css";
import NavBarItem from "../navBarItem/navBarItem";
import houseIcon from "../../assets/house-icon.png";
import bellIcon from "../../assets/bell-icon.png";
import { useNavigate } from "react-router-dom";
import Notification from "../notification/notification";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { useLogout } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../avatar/avatar";

const NavBar = () => {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const logout = useLogout();
  const { state: authState } = useAuth();

  const goFeed = () => {
    navigate("/feed");
  };

  const goNotifications = () => {
    navigate("/notifications");
  };

  const goMyProfile = () => {
    navigate("/myProfile");
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  const handleLogout = () => {
    logout();
    navigate("./home");
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  return windowWidth < 951 ? (
    <>
      <div className={classes.dropdownMenu}>
        <button onClick={goFeed}>
          <a className="has-text-black has-text-weight-medium">
            <NavBarItem icono="home" link={houseIcon} nombre="Home" />
          </a>
        </button>
        <button>
          <a className="has-text-black has-text-weight-medium">
            <NavBarItem
              icono="notifications"
              link={bellIcon}
              nombre="Notifications"
            />
          </a>
        </button>
        <button onClick={goMyProfile}>
          <a>
            <NavBarItem
              icono="profile"
              link={<Avatar user={authState.user} />}
              nombre="My profile"
            />
          </a>
        </button>
      </div>
    </>
  ) : (
    <aside className={`menu ${classes.barraLat}`}>
      <img src="/ucugram-text.png" alt="logo" className={classes.isologo} />
      <ul className={`menu-list ${classes.menuItems}`}>
        <li onClick={goFeed}>
          <a>
            <NavBarItem icono="home" link={houseIcon} nombre="Home" />
          </a>
        </li>
        <li onClick={goNotifications}>
          <a>
            <NavBarItem
              icono="notifications"
              link={bellIcon}
              nombre="Notifications"
            />
          </a>
        </li>
        <li onClick={goMyProfile}>
          <a>
            <NavBarItem
              icono="profile"
              link={<Avatar user={authState.user} />}
              nombre="My profile"
            />
          </a>
        </li>
        <li>
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </aside>
  );
};

export default NavBar;

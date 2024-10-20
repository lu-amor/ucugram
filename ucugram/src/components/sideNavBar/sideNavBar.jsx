import React, { useState, useEffect } from "react";
import classes from "./sideNavBar.module.css";
import NavBarItem from "../navBarItem/navBarItem";
import houseIcon from "../../assets/house-icon.png";
import bellIcon from "../../assets/bell-icon.png";
import { useNavigate } from "react-router-dom";
import Notification from "../notification/notification";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";

const NavBar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

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

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  return windowWidth < 950 ? (
    <>
      <Icon
        path={mdiMenu}
        size={1.5}
        className={classes.menuIcon}
        onClick={toggleDropdown}
      />
      {showDropdown && (
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
            <a className="has-text-black has-text-weight-medium">
              <NavBarItem icono="profile" link="" nombre="My profile" />
            </a>
          </button>
        </div>
      )}
    </>
  ) : (
    <aside className="menu">
      <img src="/ucugram-text.png" alt="logo" className={classes.isologo} />
      <ul className="menu-list">
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
            <NavBarItem icono="profile" link="" nombre="My profile" />
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default NavBar;

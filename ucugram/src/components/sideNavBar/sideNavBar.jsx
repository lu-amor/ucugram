import React, { useState, useEffect } from "react";
import classes from "./sideNavBar.module.css";
import NavBarItem from "../navBarItem/navBarItem";
import { useNavigate } from "react-router-dom";
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

  const goSearch = () => {
    navigate("/search");
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
            <NavBarItem icono="home" link={'null'} nombre="Home" disabled={false}/>
          </a>
        </button>
        <button onClick={goSearch}>
          <a className="has-text-black has-text-weight-medium">
            <NavBarItem icono="search" link={'null'} nombre="Search" disabled={false} />
          </a>
        </button>
        <button onClick={goNotifications}>
          <a className="has-text-black has-text-weight-medium">
            <NavBarItem
              icono="notifications"
              link={'null'}
              nombre="Notifications"
              disabled = {true}
            />
          </a>
        </button>
        <button onClick={goMyProfile}>
          <a>
            <NavBarItem
              icono="profile"
              link={<Avatar user={authState.user} />}
              nombre="My profile"
              disabled={false}
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
            <NavBarItem icono="home" link={'null'} nombre="Home" disabled={false} />
          </a>
        </li>
        <li onClick={goSearch}>
          <a>
            <NavBarItem icono="search" link={'null'} nombre="Search" disabled={false}/>
          </a>
        </li>
        <li onClick={goNotifications}>
          <a>
            <NavBarItem
              icono="notifications"
              link={'null'}
              nombre="Notifications"
              disabled={true}
            />
          </a>
        </li>
        <li onClick={goMyProfile}>
          <a>
            <NavBarItem
              icono="profile"
              link={<Avatar user={authState.user} />}
              nombre="My profile"
              disabled={false}
            />
          </a>
        </li>
        <li onClick={handleLogout}>
          <a>
            <NavBarItem
              icono="exit"
              link={'null'}
              nombre="Logout"
              disabled={false}
            />
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default NavBar;

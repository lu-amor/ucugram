import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthNavBar.module.css";
import LoginForm from "../../components/loginForm/loginForm.jsx";
import CreateAccountForm from "../../components/createAccountForm/createAccountForm.jsx";
import Icon from '@mdi/react';
import { mdiExitToApp, mdiMenu } from '@mdi/js';

function AuthNavBar({navItem}) {
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const [navItem, setnavItem] = useState(navItems.home);
  const navigate = useNavigate();

  const handleCreateAccountBtn = () => {
    setShowCreateAccountForm(true);
    setShowLoginForm(false);
  };

  const handleGoLoginModalBtn = () => {
    setShowCreateAccountForm(false);
    setShowLoginForm(true);
  };

  const closeModals = () => {
    setShowCreateAccountForm(false);
    setShowLoginForm(false);
  };

  const handleMenuClick = () => setShowMenu(!showMenu);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, []);

  const goHome = () => {
    navigate("/home");
  };

  const goDoc = () => {
    navigate("/documentation");
  };

  const goAboutUs = () => {
    navigate("/about-us");
  };

  return (
    <div className={classes.navBarComponent}>
        <div className={classes.logoContainer} onClick={goHome}>
          <img
            src="/ucugram-logo.png"
            style={{ alignSelf: "center", height: "2rem", width: "100%" }}
          />
          <img
            src="/ucugram-text-sinFondo.png"
            style={{ alignSelf: "center", height: "2rem", width: "100%", marginRight: "20px" }}
          />
        </div>
        {windowWidth > 850 ? (
          <div className={classes.navBarOptions}>
            <button onClick={goHome} className={classes.underlineButton}>
              {navItem === "home" ? (
                <strong className={`${classes.buttonSelected}`}>
                  Home
                </strong>
              ) : (
                <span>Home</span>
              )}
            </button>
            <button onClick={goDoc} className={classes.underlineButton}>
              {navItem === "documentation" ? (
                <strong className={`${classes.buttonSelected}`}>
                  Documentation
                </strong>
              ) : (
                <span>Documentation</span>
              )}
            </button>
            <button onClick={goAboutUs} className={classes.underlineButton}>
              {navItem === "about-us" ? (
                <strong className={`${classes.buttonSelected}`}>
                  About us
                </strong>
              ) : (
                <span>About us</span>
              )}
            </button>
          </div>
      ) : (
        <>
          <Icon path={mdiMenu} size={1.5} color="white" className={classes.menuIcon} onClick={handleMenuClick} />
          {showMenu && (
            <div className={classes.menu}>
              <button onClick={goHome}>Home</button>
              <button onClick={goDoc}>Documentation</button>
              <button onClick={goAboutUs}>About us</button>
            </div>
          )}
        </>
        )}
        <div className={classes.buttonsContainer}>
          <button
            className="button"
            id={classes.signInButton}
            onClick={handleGoLoginModalBtn}
          >
            Sign in
          </button>
          <button
            className="button"
            id={classes.signUpButton}
            onClick={handleCreateAccountBtn}
          >
            Sign up
          </button>
        </div>
      {showLoginForm && (
        <LoginForm
          createAccount={handleCreateAccountBtn}
          closeModal={closeModals}
        />
      )}
      {showCreateAccountForm && (
        <CreateAccountForm
          goLogin={handleGoLoginModalBtn}
          closeModal={closeModals}
        />
      )}
    </div>
  );
}

export default AuthNavBar;

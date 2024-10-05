import React, { useState } from "react";
import classes from "./HomePage.module.css";
import LoginForm from "../../components/loginForm/loginForm.jsx";
import CreateAccountForm from "../../components/createAccountForm/createAccountForm.jsx";

const HomePage = () => {
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

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

  }

  return (
    <div className="loginPage">
      {/* contenedor para la barra de navegación */}
      <div className={classes.navBar}>
        <div className={classes.logoContainer}>
          <img
            src="/ucugram-logo.png"
            style={{ alignSelf: "center", height: "85%", width: "auto" }}
          />
          <img
            src="/ucugram-text-sinFondo.png"
            style={{ alignSelf: "center", height: "65%", width: "auto" }}
          />
        </div>
        <div className="navbar-start">
          <a className="navbar-item">Home</a>
          <a className="navbar-item">Documentation</a>
          <a className="navbar-item">About us</a>
        </div>
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
      </div>
      {showLoginForm && <LoginForm createAccount={handleCreateAccountBtn} closeModal={closeModals} />}
      {showCreateAccountForm && (
        <CreateAccountForm goLogin={handleGoLoginModalBtn} closeModal={closeModals}/>
      )}
    </div>
  );
};

export default HomePage;

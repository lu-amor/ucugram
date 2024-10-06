import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import classes from "./AuthNavBar.module.css";
import LoginForm from "../../components/loginForm/loginForm.jsx";
import CreateAccountForm from "../../components/createAccountForm/createAccountForm.jsx";

function AuthNavBar() {
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
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

  const goHome = () => {
    navigate("/home");
  }

  const goDoc = () => {
    navigate("/documentation");
  }

  const goAboutUs = () => {
    navigate("/about-us");
  }

  return (
    <div>
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
          <div className={classes.navBarOptions}>
            <button onClick={goHome}>Home</button>
            <button onClick={goDoc}>Documentation</button>
            <button onClick={goAboutUs}>About us</button>
          </div>
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
      {showLoginForm && (
        <LoginForm createAccount={handleCreateAccountBtn} closeModal={closeModals} />
      )}
      {showCreateAccountForm && (
        <CreateAccountForm goLogin={handleGoLoginModalBtn} closeModal={closeModals} />
      )}
    </div>
  );
}

export default AuthNavBar;

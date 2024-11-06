import React, { useRef, useState } from "react";
import classes from "./loginForm.module.css";
import { useNavigate } from "react-router-dom";

function LoginForm({ createAccount, closeModal }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const navigate = useNavigate();

  const handleCreateAccountBtn = () => {
    // logica para crear cuenta here
    createAccount();
  };

  const validateEmail = (email) => {
    // para validar correos @ucu.edu.uy o @correo.ucu.edu.uy
    const ucuEmailPattern = /^[a-zA-Z0-9._%+-]+@(ucu\.edu\.uy|correo\.ucu\.edu\.uy)$/;
    return ucuEmailPattern.test(email);
  };

  const handleLoginBtn = () => {
    const newEmail = emailRef.current.value;
    const newPassword = passwordRef.current.value;

    if (!validateEmail(newEmail)) {
      alert("Por favor, ingresa un email válido de la UCU.");
      return;
    }
    // aca se hace algo más

    navigate("/myProfile"); // aca va a tener que estar la ruta del usuario
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLoginBtn();
    }
  };


  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
          <button
            className={`${classes.delete} delete`}
            onClick={closeModal}
          ></button>
        <div className={classes.modalContainer}>
          <div className={classes.logoContainer}>
            <img src="/ucugram-logo.png" className={classes.logo} />
          </div>
          <div className={classes.logoContainer}>
            <img
              src="/ucugram-text-sinFondo.png"
              alt="logo"
              className={classes.isologo}
            />
          </div>
          <div className={classes.field}>
            <label className="label">email</label>
            <input
              className="input"
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
            ></input>
          </div>
          <div className={classes.field}>
            <label className="label">password</label>
            <input
              className="input"
              type="password"
              placeholder="Enter password"
              ref={passwordRef}
              onKeyDown={handleKeyDown}
            ></input>
          </div>
          <div className={classes.buttonContainer}>
            <button
              className="button"
              id={classes.loginButton}
              onClick={handleLoginBtn}
            >
              Login
            </button>
          </div>
          <div className={classes.buttonContainer}>
            <button
              style={{ font: "12px arial", marginBottom: "10px" }}
              onClick={handleCreateAccountBtn}
            >
              Create account <strong>here</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

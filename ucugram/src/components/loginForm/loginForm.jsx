import React, { useRef, useState } from "react";
import classes from "./loginForm.module.css";

function LoginForm() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleCreateAccountBtn = () => {
    // logica para crear cuenta here
  };

  const handleLoginBtn = () => {
    const newEmail = emailRef.current.value;
    const newPassword = passwordRef.current.value;

    // aca se hace algo más
  };

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
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
              type="text"
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
            ></input>
          </div>
          <div className={classes.buttonContainer}>
            <button
              className={`button ${classes.loginButton}`}
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

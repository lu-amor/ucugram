import React, { useRef, useState } from "react";
import classes from "./loginForm.module.css";

function LoginForm() {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  return (
    <div className={classes.modal}>
      <div className={classes.modalContent}>
        <div className={classes.modalContainer}>
            <div className={classes.logoContainer}>
                <img src="/ucugram-text-sinFondo.png" alt="logo" className={classes.isologo} />
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
            <button className={`button ${classes.loginButton}`}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

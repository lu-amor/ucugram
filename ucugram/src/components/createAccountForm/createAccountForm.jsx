import React, { useRef, useState } from "react";
import classes from "./createAccountForm.module.css";

function CreateAccountForm({ goLogin, closeModal }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const nameRef = useRef("");
  const lastNameRef = useRef("");

  const PASSWORD_WARNING = "Password must be at least 10 characters";

  const handleGoBackBtn = () => {
    goLogin();
  };

  const validateEmail = (email) => {
    // para validar correos @ucu.edu.uy o @correo.ucu.edu.uy
    const ucuEmailPattern = /^[a-zA-Z0-9._%+-]+@(ucu\.edu\.uy|correo\.ucu\.edu\.uy)$/;
    return ucuEmailPattern.test(email);
  };

  const handleCreateAccountBtn = () => {
    const newEmail = emailRef.current.value;
    const newPassword = passwordRef.current.value;
    const newUserName = userNameRef.current.value;
    const newName = nameRef.current.value;
    const newLastName = lastNameRef.current.value;

    if (!validateEmail(newEmail)) {
      alert("Por favor, ingresa un email válido de la UCU.");
      return;
    }

    // more logic here
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
          <div className={classes.userInfoContainer}>
            <div style={{ width: "48%" }}>
              <label className="label">Name</label>
              <input
                className="input"
                type="text"
                placeholder="Enter your name"
                ref={nameRef}
              ></input>
            </div>
            <div style={{ width: "48%" }}>
              <label className="label">Last Name</label>
              <input
                className="input"
                type="text"
                placeholder="Enter your last name"
                ref={lastNameRef}
              ></input>
            </div>
          </div>
          <div className={classes.field}>
            <label className="label">Username</label>
            <input
              className="input"
              type="text"
              placeholder="Choose a username"
              ref={userNameRef}
            ></input>
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
              placeholder="Enter a password"
              title={PASSWORD_WARNING}
              ref={passwordRef}
            ></input>
          </div>
          <div className={classes.buttonContainer}>
            <button className="button" id={classes.createAccountButton} onClick={handleCreateAccountBtn}>
              Create new account
            </button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <button style={{ font: "12px arial" }} onClick={handleGoBackBtn}>
              {"<"} go login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountForm;

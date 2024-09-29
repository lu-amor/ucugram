import React, { useRef, useState } from "react";
import classes from "./createAccountForm.module.css";

function CreateAccountForm({ closeModal }) {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const nameRef = useRef("");
  const lastNameRef = useRef("");

  const handleGoBackBtn = () => {
    closeModal();
  };

  const handleCreateAccountBtn = () => {
    const newEmail = emailRef.current.value;
    const newPassword = passwordRef.current.value;
    const newUserName = userNameRef.current.value;
    const newName = nameRef.current.value;
    const newLastName = lastNameRef.current.value;

    // more logic here 
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
            <label className="label">User Name</label>
            <input
              className="input"
              type="text"
              placeholder="Choose a new user name"
              ref={userNameRef}
            ></input>
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
            <button className={`button ${classes.loginButton}`}>
              Create new account
            </button>
          </div>
          <div style={{ marginTop: "10px" }}>
            <button style={{ font: "12px arial" }} onClick={handleGoBackBtn}>
              {"<"} back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountForm;

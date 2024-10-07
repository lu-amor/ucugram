import React, { useState } from "react";
import classes from "./AuthPage.module.css";
import AuthNavBar from "../../components/authNavBar/AuthNavBar.jsx";
import LoginForm from "../../components/loginForm/loginForm.jsx";
import CreateAccountForm from "../../components/createAccountForm/createAccountForm.jsx";

const AuthPage = () => {
  return (
    <div>
      <AuthNavBar />
      <div className={classes.homePageContainer}>
        <div className={classes.title}>
          <p>BIENVENIDO</p>
          <p>A LA VIDA UNIVERSITARIA DE LA UCU</p>
          <p>EN EL MUNDO DIGITAL</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

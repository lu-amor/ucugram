import React, { useState } from "react";
import classes from "./AuthPage.module.css";
import AuthNavBar from "../../components/authNavBar/AuthNavBar.jsx";
import LoginForm from "../../components/loginForm/loginForm.jsx";
import CreateAccountForm from "../../components/createAccountForm/createAccountForm.jsx";

const AuthPage = () => {

  return (
    <div>
      <AuthNavBar />
      <p>esto es el home de la pagina, el mensaje de bienventdos!</p>
    </div>
  );
};

export default AuthPage;

import React, { useState } from "react";
import classes from "./AuthPage.module.css";
import AuthNavBar from "../../components/authNavBar/AuthNavBar.jsx";
import LoginForm from "../../components/loginForm/loginForm.jsx";
import CreateAccountForm from "../../components/createAccountForm/createAccountForm.jsx";
import Footer from "../../components/footer/footer.jsx";

const AuthPage = () => {

  return (
    <div>
      <AuthNavBar />
      <p>esto es el home de la pagina, el mensaje de bienvenidos!</p>
      <Footer />
    </div>
  );
};

export default AuthPage;

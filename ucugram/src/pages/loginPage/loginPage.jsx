import React, { useState } from "react";
import classes from "./loginPage.module.css";
import LoginForm from "../../components/loginForm/loginForm.jsx";
import CreateAccountForm from "../../components/createAccountForm/createAccountForm.jsx";

const LoginPage = () => {
  const [showCreateAccountForm, setShowCreateAccountForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(true);

  const handleCreateAccountBtn = () => {
    setShowCreateAccountForm(true);
    setShowLoginForm(false);
  };

  const handleGoLoginModalBtn = () => {
    setShowCreateAccountForm(false);
    setShowLoginForm(true);
  }

  return (
    <div className="loginPage">
      {showLoginForm && <LoginForm createAccount={handleCreateAccountBtn}/>}
      {showCreateAccountForm && <CreateAccountForm closeModal={handleGoLoginModalBtn}/>}
    </div>
  );
};

export default LoginPage;

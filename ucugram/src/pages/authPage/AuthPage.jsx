import React, { useState } from "react";
import classes from "./AuthPage.module.css";
import AuthNavBar from "../../components/authNavBar/AuthNavBar.jsx";
import Footer from "../../components/footer/footer.jsx";


const AuthPage = () => {
  return (
    <div className={classes.page}>
      <header className={classes.header}>
        <AuthNavBar navItem="home" />
      </header>
      <div className={classes.homePageContainer}>
        <div className={classes.overlay}>
          <div className={classes.content}>
            <div className={classes.welcomeSign}>
              <img src="public\bienventid@s.png" alt="imagen de bienvenida" />
            </div>
          </div>
        </div>
      </div>
      <footer className={classes.footer}>
        <Footer/>
      </footer>
    </div>
  );
};

export default AuthPage;

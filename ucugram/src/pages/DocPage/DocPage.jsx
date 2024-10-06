import React, { useState } from "react";
import classes from "./DocPage.module.css";
import AuthNavBar from "../../components/authNavBar/AuthNavBar.jsx";

const DocPage = () => {

  return (
    <div>
      <AuthNavBar />
      <p>esto es la documentacion del coso</p>
    </div>
  );
};

export default DocPage;

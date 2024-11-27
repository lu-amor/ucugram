import React, { useState } from "react";
import classes from "./DocPage.module.css";
import AuthNavBar from "../../components/authNavBar/AuthNavBar.jsx";

const DocPage = () => {

  return (
    <div>
      <AuthNavBar navItem="documentation"/>
      <div className={`columns is-flex-direction-row ${classes.columnas}`}>
        <div className="column is-1">
          <img src="../src/assets/ramas-repo.png" alt="ramas-repo" className={classes.ramas} />
        </div>
        <div className="column is-9">
          <p>esto es la documentacion del coso</p>
        </div>
      </div>
    </div>
  );
};

export default DocPage;

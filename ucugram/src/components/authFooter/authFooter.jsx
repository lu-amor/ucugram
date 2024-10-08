import React from "react";
import classes from "./authFooter.module.css";

function AuthFooter() {
  return (
    <div className={classes.footerContainer}>
      <div className={classes.generalInformation}>
        <p style={{fontWeight: "bold"}}>Campus Montevideo</p>
        <p><u>Av. 8 de Octubre 2738</u></p>
        <p><u>(+598) 2487 2717 int. 6025</u></p>
      </div>
      <div>
      </div>
    </div>
  );
}

export default AuthFooter;

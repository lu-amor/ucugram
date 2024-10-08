import React, { useState } from "react";
import AuthNavBar from "../../components/authNavBar/AuthNavBar.jsx";

const AboutUsPage = () => {
  return (
    <div>
      <AuthNavBar navItem="about-us"/>
      <p>acá va nuestra info</p>
    </div>
  );
};

export default AboutUsPage;

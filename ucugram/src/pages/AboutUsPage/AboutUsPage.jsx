import React, { useState } from "react";
import AuthNavBar from "../../components/authNavBar/AuthNavBar.jsx";
import Developer from "../../components/developer/developer.jsx";
import Footer from "../../components/footer/footer.jsx";
import classes from "./aboutUsPage.module.css";

const AboutUsPage = ({developers}) => {
  return (
    <div className={`${classes.pageContainer}`}>
      <AuthNavBar navItem="about-us" />
      <div className={`${classes.content}`}>
            <h1 className="has-text-centered title is-2 mt-5" style={{color: "#173363"}}>About Us</h1>
            <p className={`has-text-centered mx-6`} style={{color: "#173363"}}>
                Ucugram is a social network that allows you to share your photos with people from the university.{<br />} 
                You can also follow other users and see their posts. {<br />}
                Ucugram is a project developed by students of the Universidad Católica del Uruguay.
            </p>
            <h2 className={"has-text-centered title is-4 mt-5"} style={{color: "#173363"}}>Meet us!</h2>
            <div className={`${classes.developersContainer}`}>
                {developers.map((developer, index) => (
                    <Developer
                        key={index}
                        name={developer.name}
                        avatar={developer.avatar}
                        github={developer.github}
                        mail={developer.mail}
                        linkedin={developer.linkedin}
                    />
                ))}
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default AboutUsPage;

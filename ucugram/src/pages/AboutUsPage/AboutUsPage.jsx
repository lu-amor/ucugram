import React, { useState } from "react";
import AuthNavBar from "../../components/authNavBar/AuthNavBar.jsx";
import Footer from "../../components/footer/footer.jsx";

const AboutUsPage = () => {
  return (
    <div>
      <AuthNavBar />
      <div>
        <h1>About Us</h1>
        <p>
          Ucugram is a social network that allows you to share your photos with
          people from the university. You can also follow other users and see
          their posts. Ucugram is a project developed by students of the
          Universidad Católica del Uruguay.
        </p>
        <h2>Meet us!</h2>
        {/*             <div>
                {developers.map((developer, index) => (
                    <Developer
                        key={index}
                        name={developer.name}
                        github={developer.github}
                        mail={developer.mail}
                        linkedin={developer.linkedin}
                    />
                ))}
            </div> */}
        <Footer />
      </div>
    </div>
  );
};

export default AboutUsPage;

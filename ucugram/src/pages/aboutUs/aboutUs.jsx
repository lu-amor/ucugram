import React from "react";
import Footer from "../../components/footer/footer";
import Developer from "../../components/developer/developer";

const AboutUs = ({developers}) => {
    return (
        <div>
            <h1>About Us</h1>
            <p>
                Ucugram is a social network that allows you to share your photos with people from the university. 
                You can also follow other users and see their posts. 
                Ucugram is a project developed by students of the Universidad Católica del Uruguay.
            </p>
            <h2>Meet us!</h2>
            <div>
                {developers.map((developer, index) => (
                    <Developer
                        key={index}
                        name={developer.name}
                        github={developer.github}
                        mail={developer.mail}
                        linkedin={developer.linkedin}
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
};

export default AboutUs;
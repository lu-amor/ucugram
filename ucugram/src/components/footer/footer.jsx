import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./footer.module.css";

const Footer = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/home");
    };
    
    const goDoc = () => {
        navigate("/documentation");
    };
    
    const goAboutUs = () => {
        navigate("/about-us");
    };

    return (
        <footer className={`${classes.footer}`}>
            <div className={`${classes.facultad}`}>
                <p className={`${classes.title}`}>Campus Montevideo</p>
                <a href="https://maps.app.goo.gl/p7zFe5fJuA7q4RWZA" target="_blank" rel="noopener noreferrer">
                    <p className={`${classes.text}`}>Av. 8 de Octubre 2738</p>
                </a>
                <p className={`${classes.text}`} style={{cursor: "auto"}}>(+598) 2487 2717 int. 6025</p>
                <a href={`mailto:infoweb@ucu.edu.uy`} target="_blank" rel="noopener noreferrer">
                    <p className={`${classes.text}`}>infoweb@ucu.edu.uy</p>
                </a>
                </div>
            <div className={`${classes.centro}`}>
                <img src='/ucugram-logo.png' alt='ucugram logo' className={`${classes.ucugramLogo}`}/>
                <div className={`${classes.divider}`}/>
                <div className={`${classes.pages}`}>
                    <p className={`${classes.page}`} onClick={goHome}>Home</p>
                    <p className={`${classes.page}`} onClick={goDoc}>Documentation</p>
                    <p className={`${classes.page}`} onClick={goAboutUs}>About us</p>
                </div>
            </div>
            <div className={`${classes.redes}`}>
                <p className={`${classes.copyright}`}>&copy; 2024 Ucugram</p>
                <div className={`${classes.socialMediaIcons}`}>
                    <img src='sn-facebook-w.svg' alt='facebook icon' className={`${classes.icon}`}/>
                    <img src='sn-instagram-w.svg' alt='instagram icon' className={`${classes.icon}`}/>
                    <img src='sn-linkedin-w.svg' alt='linkedin icon' className={`${classes.icon}`}/>
                    <img src='sn-twitter-w.svg' alt='twitter icon' className={`${classes.icon}`}/>
                    <img src='sn-youtube-w.svg' alt='youtube icon' className={`${classes.icon}`}/>
                </div>
            </div>
        </footer>
    )
};

export default Footer;
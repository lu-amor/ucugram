import React from "react";
import classes from "./footer.module.css";

const Footer = () => {
    return (
        <footer className={`${classes.footer}`}>
            <div className={`${classes.facultad}`}>
                <p className={`${classes.title}`}>Campus Montevideo</p>
                <p className={`${classes.text}`}>Av. 8 de Octubre 2738</p>
                <p className={`${classes.text}`}>(+598) 2487 2717 int. 6025</p>
                <p className={`${classes.text}`}>infoweb@ucu.edu.uy</p>
            </div>
            <div className={`${classes.centro}`}>
                <img src='/ucugram-logo.png' alt='ucugram logo' className={`${classes.ucugramLogo}`}/>
                <div className={`${classes.divider}`}/>
                <div className={`${classes.pages}`}>
                    <p className={`${classes.page}`}>Home</p>
                    <p className={`${classes.page}`}>Description</p>
                    <p className={`${classes.page}`}>About us</p>
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
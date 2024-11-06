import React, {useState, useEffect} from "react";
import classes from "./navBarItem.module.css";

const NavBarItem = ({ icono, link, nombre }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isImage = typeof link === 'string';

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, []);

    return windowWidth > 950 ? (
        <div className={classes.navBarItem}>
            {isImage ? (
                <img src={link} alt={icono} className={classes.icono} />
            ) : (
                <div className={classes.avatar}>{link}</div>
            )}
            <p className="has-text-weight-bold">{nombre}</p>
        </div>
    ) : (
        <div className={classes.navBarItemH}>
            {isImage ? (
                <img src={link} alt={icono} className={classes.iconoH} />
            ) : (
                <div className={classes.avatarH}>{link}</div>
            )}
        </div>
    );
};

export default NavBarItem;

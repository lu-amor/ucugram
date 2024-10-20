import React from "react";
import classes from "./navBarItem.module.css";

const NavBarItem = ({ icono, link, nombre }) => {
    const isImage = typeof link === 'string';

    return (
        <div className={classes.navBarItem}>
            {isImage ? (
                <img src={link} alt={icono} className={classes.icono} />
            ) : (
                <div className={classes.avatar}>{link}</div>
            )}
            <p>{nombre}</p>
        </div>
    );
};

export default NavBarItem;

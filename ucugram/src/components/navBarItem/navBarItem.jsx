import React from "react";
import classes from "./navBarItem.module.css";

const NavBarItem = ({ icono, link, nombre }) => {
    return (
        <div className={classes.navBarItem}>
            <img src={link} alt={icono} className={classes.icono} />
            <p>{nombre}</p>
        </div>
    );
};

export default NavBarItem;
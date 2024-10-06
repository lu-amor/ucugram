import React from "react";
import classes from "./sideNavBar.module.css";
import NavBarItem from "../navBarItem/navBarItem";
import houseIcon from '../../assets/house-icon.png';
import bellIcon from '../../assets/bell-icon.png';
import Avatar from "../avatar/avatar";

//aca creo que hay que hacer un fetch dsp para traer la foto de perfil del usuario
const user = {
    profilePhoto: '/profile_img-by-AI.jpeg'
};

const NavBar = () => {
    return (
        <aside className="menu">
            <img src="/ucugram-text.png" alt="logo" className={classes.isologo}/>
            <ul className="menu-list">
                <li><a><NavBarItem icono="home" link={houseIcon} nombre="Home" /></a></li>
                <li><a><NavBarItem icono="notifications" link={bellIcon} nombre="Notifications" /></a></li>
                <li><a><NavBarItem icono="profile" link={<Avatar user={user} />} nombre="My profile" /></a></li>
            </ul>
        </aside>
    );
};

export default NavBar;
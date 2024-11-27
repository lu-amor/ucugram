import React, {useState, useEffect} from "react";
import classes from "./navBarItem.module.css";
import IonIcon from '@reacticons/ionicons';

const NavBarItem = ({ icono, link, nombre, disabled }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const isIcon = link === 'null';

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, []);

    return windowWidth > 950 ? (
        <div className={classes.navBarItem}>
            {isIcon ? (
                <IonIcon name={icono} style={{color: disabled ? '#8b9ab1' : '#173363', width: '25px', marginLeft: '21px', marginTop: '-9px', marginRight: '5px'}}/>
            ) : (
                <div className={classes.avatar}>{link}</div>
            )}
            <p className="has-text-weight-bold has-text-info">{nombre}</p>
        </div>
    ) : (
        <div className={classes.navBarItemH}>
            {isIcon ? (
                <IonIcon name={icono} style={{color: disabled ? '#8b9ab1' : '#173363', width: '25px', marginTop: '-9px'}}/>
            ) : (
                <div className={classes.avatarH}>{link}</div>
            )}
        </div>
    );
};

export default NavBarItem;

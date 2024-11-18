import React from "react";
import classes from "./developer.module.css";
import IonIcon from '@reacticons/ionicons';

const Developer = ({name, avatar, github, mail, linkedin}) => {
    const getBackgroundClass = (name) => {
        switch (name) {
            case "Lucía":
                return classes.backgroundLula;
            case "Manuela":
                return classes.backgroundManu;
            case "Paulina":
                return classes.backgroundPau;
            default:
                return classes.backgroundDefault;
        }
    };

    return (
        <div className={`${classes.devContainer} ${getBackgroundClass(name)}`}>
            <img src={avatar} alt="developer" className={classes.avatar}/>
            <h2 className={`${classes.name}`}>{name}</h2>
            <div className={`${classes.links}`}>
                <a href={`mailto:${mail}`} target="_blank" rel="noopener noreferrer">
                    <IonIcon name='mail' size="medium" className={`${classes.icon}`}/>
                </a>
                <a href={github} target="_blank" rel="noopener noreferrer">
                    <IonIcon name='logo-github' size="medium" className={`${classes.icon}`}/>
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    <IonIcon name='logo-linkedin' size="medium" className={`${classes.icon}`}/>
                </a>
            </div>
        </div>
    )
};

export default Developer;
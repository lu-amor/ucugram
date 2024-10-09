import React from "react";
import classes from "./developer.module.css";

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
            <img src={avatar} alt="developer" className={`${classes.avatar}`}/>
            <h2 className={`${classes.name}`}>{name}</h2>
            <p>
                <span className={`${classes.media}`}>
                    Github:
                </span>
                <span className={`${classes.user}`}>
                    {github}
                </span>
            </p>
            <p>
                <span className={`${classes.media}`}>
                    Mail
                </span>
                <span className={`${classes.user}`}>
                    {mail}
                </span>
            </p>
            <p>
                <span className={`${classes.media}`}>
                    LinkedIn: 
                </span>
                <span className={`${classes.user}`}>
                    {linkedin}
                </span>
            </p>
        </div>
    )
};

export default Developer;
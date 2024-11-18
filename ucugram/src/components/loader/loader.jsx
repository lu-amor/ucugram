import React from "react";
import classes from "./loader.module.css";
import IonIcon from '@reacticons/ionicons';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

const Loader = () => {
    return (
        <div className={classes.loaderContainer}>
            <img src="../src/assets/ucugram-loader.png" alt="loading" className={classes.loaderBackground}/>
            <Icon path={mdiLoading} size={0.7} color="#173363" className={classes.spinner} spin={1.5} />
        </div>
    );
};

export default Loader;
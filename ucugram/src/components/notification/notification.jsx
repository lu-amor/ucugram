import React from "react";
import classes from "./notification.module.css";
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

const Notification = ({type, user, time}) => {
    if (type === "like") {
        return (
            <div className={classes.notificationContainer}>
                <p className={classes.user}>{user}</p>
                <p className={classes.text}> liked your post</p>
                <p className={classes.time}>{time}</p>
                <p className={classes.post}>post</p>
                <Icon path={mdiClose} size={1} className={classes.closeButton}/>
            </div>
        );
    } else if (type === "follow") {
        return (
            <div className={classes.notificationContainer}>
                <p className={classes.user}>{user}</p>
                <p className={classes.text}> added you as a friend</p>
                <p className={classes.time}>{time}</p>
                <button class={`button is-info ${classes.customButton}`} onClick={close /*ver si lo estamos siguiendo o no */}>Add back</button>
                <Icon path={mdiClose} size={1} className={classes.closeButton}/>
            </div>
        );
    }
}

export default Notification;
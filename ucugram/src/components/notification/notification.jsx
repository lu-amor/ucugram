import React from "react";
import classes from "./notification.module.css";
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import Avatar from "../avatar/avatar";

const Notification = ({ type, user, notificationId, time, onDelete }) => {
    if (type === "like") {
        return (
            <div className={classes.notificationContainer} key={notificationId}>
                <div className={classes.avatarContainer}>
                    <Avatar user={user} />
                </div>
                <p className={classes.user}>{user.name}</p>
                <p className={classes.text}> liked your post</p>
                <p className={classes.time}>{time}</p>
                <p className={classes.post}>post</p>
                <Icon path={mdiClose} size={1} className={classes.closeButton} onClick={onDelete}/>
            </div>
        );
    } else if (type === "follow") {
        return (
            <div className={classes.notificationContainer} key={notificationId}>
                <div className={classes.avatarContainer}>
                    <Avatar user={user} />
                </div>
                <p className={classes.user}>{user.name}</p>
                <p className={classes.text}> added you as a friend</p>
                <p className={classes.time}>{time}</p>
                <button className={`button is-info ${classes.customButton}`} onClick={close /*ver si lo estamos siguiendo o no */}>Add back</button>
                <Icon path={mdiClose} size={1} className={classes.closeButton} onClick={onDelete}/>
            </div>
        );
    }
}

export default Notification;

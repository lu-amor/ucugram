import React from "react";
import classes from "./notification.module.css";
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import Avatar from "../avatar/avatar";
import IonIcon from '@reacticons/ionicons';

const Notification = ({ type, user, notificationId, time, onDelete }) => {
    if (type === "like") {
        return (
            <div className={classes.notificationContainer} key={notificationId}>
                <div className={classes.avatarContainer}>
{/*                     <Avatar
                        className={`${classes.userAvatar}`}
                        user={user}
                    ></Avatar> */}
                </div>
                <div className={classes.notificationText}>
                    <span className={classes.notificationContent}>
                        <span className={classes.user}>{user.name}</span>
                        <span className={classes.text}> liked your post </span>
                        <span className={classes.time}>{time}</span>
                    </span>
                </div>
                <div className={classes.post}></div>
                <IonIcon name="close" className={classes.closeButton} onClick={onDelete}/>
            </div>
        );
    } else if (type === "follow") {
        return (
            <div className={classes.notificationContainer} key={notificationId}>
                <div className={classes.avatarContainer}>
{/*                     <Avatar
                        className={`${classes.userAvatar}`}
                        user={user}
                    ></Avatar> */}
                </div>
                <div className={classes.notificationText}>
                    <span className={classes.notificationContent}>
                        <span className={classes.user}>{user.name}</span>
                        <span className={classes.text}> started following you </span>
                        <span className={classes.time}>{time}</span>
                    </span>
                </div>
                <button className={`button is-info has-text-white is-align-self-center is-small ${classes.addFriendButton}`} onClick={close /*ver si lo estamos siguiendo o no */}>Add back</button>
                <IonIcon name="close" className={classes.closeButton} onClick={onDelete}/>
            </div>
        );
    } else if (type === "comment") {
        return (
            <div className={classes.notificationContainer} key={notificationId}>
                <div className={classes.avatarContainer}>
{/*                     <Avatar
                        className={`${classes.userAvatar}`}
                        user={user}
                    ></Avatar> */}
                </div>
                <div className={classes.notificationText}>
                    <span className={classes.notificationContent}>
                        <span className={classes.user}>{user.name}</span>
                        <span className={classes.text}> commented your post </span>
                        <span className={classes.time}>{time}</span>
                    </span>
                </div>
                <div className={classes.post}></div>
                <IonIcon name="close" className={classes.closeButton} onClick={onDelete}/>
            </div>
        );
    }
}

export default Notification;

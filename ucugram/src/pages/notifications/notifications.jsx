import React from "react";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import classes from "./notifications.module.css";
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import Notification from "../../components/notification/notification";

function Notifications({ user }) {
return (
    <div className="columns">
        <SideNavBar user={user} />
        <div className="column is-10">
                <h1 className={classes.header}>
                    <Icon path={mdiChevronLeft} size={2} onClick={close /*ruteo a feed*/} />
                    Notifications
                </h1>
                <Notification type="like" user="nombre_usuario1" time="1h" />
                <Notification type="follow" user="nombre_usuario2" time="5h" />
                <Notification type="like" user="nombre_usuario3" time="2h" />
        </div>
    </div>
);
}

export default Notifications;
import React, { useEffect, useState } from "react";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import classes from "./notifications.module.css";
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import Notification from "../../components/notification/notification";

const convertTimeToSeconds = (time) => {
const value = parseInt(time.slice(0, -1));
const unit = time.slice(-1);

switch (unit) {
    case 's': // segundos
    return value;
    case 'm': // minutos
    return value * 60;
    case 'h': // horas
    return value * 60 * 60;
    case 'd': // días
    return value * 60 * 60 * 24;
    default:
    return 0;
}
};

function Notifications({ user, notificationsList }) {
    const [notifications, setNotifications] = useState(notificationsList);

    useEffect(() => {
        setNotifications(notificationsList);
    }, [notificationsList]);

    const sortedNotifications = notifications.sort((a, b) => {
        return convertTimeToSeconds(b.time) - convertTimeToSeconds(a.time);
    });

    const deleteHandler = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <div className="columns">
            <SideNavBar user={user} />
            <div className="column is-10">
                <h1 className={classes.header}>
                    <div className={classes.goBack}>
                        <Icon path={mdiChevronLeft} size={2} onClick={close /*ruteo a feed*/}/>
                    </div>
                    Notifications
                </h1>
                {sortedNotifications.map(notification => (
                    <Notification
                        key={notification.id}
                        type={notification.type}
                        user={notification.user}
                        time={notification.time}
                        avatar={notification.avatar}
                        onDelete={() => deleteHandler(notification.id)}
                    />
                ))}
            </div>
        </div>
    );
}

export default Notifications;

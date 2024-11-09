import React, { useEffect, useState } from "react";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import classes from "./notifications.module.css";
import Notification from "../../components/notification/notification";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import IonIcon from '@reacticons/ionicons';

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
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(notificationsList);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const { state: authState } = useAuth();

    useEffect(() => {
        setNotifications(notificationsList);
    }, [notificationsList]);

    const sortedNotifications = notifications.sort((a, b) => {
        return convertTimeToSeconds(b.time) - convertTimeToSeconds(a.time);
    });

    const deleteHandler = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    const goFeed = () => {
        navigate("/feed");
    }

    const updateWindowWidth = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        if (!authState.isAuthenticated) {
            navigate("./home");
        }
        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, []);

    return (
        <>
            <div className="columns mr-0 is-flex-direction-row">
                <SideNavBar />
                {windowWidth > 950 ? (
                    <div className={`column is-10 ${classes.pageContent}`}>
                        <div>
                            <h1 className={classes.header}>
                                <IonIcon
                                    name="chevron-back-outline"
                                    className={`${classes.goBack}`}
                                    style={{ '--ionicon-stroke-width': '16px', 'cursor': 'pointer' }}
                                    onClick={goFeed}
                                />
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
                ) : (
                    <div className={`${classes.pageContent}`}>
                        <h1 className={classes.header}>
                            <IonIcon
                                name="chevron-back-outline"
                                className={`${classes.goBack}`}
                                style={{ 'stroke-width': '16px', 'cursor': 'pointer' }}
                                onClick={goFeed}
                            />
                            Notifications
                        </h1>
                        <div className="notificationContainer">
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
                )}
            </div>
        </>
    );
}
export default Notifications;
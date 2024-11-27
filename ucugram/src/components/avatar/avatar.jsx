import React from "react";
import classes from "./avatar.module.css";

function Avatar({ user }) {
  return (
    <div className={classes.avatarContainer}>
      <img
        className={classes.avatar}
        src={
          user?.profilePicture
            ? user.profilePicture
            : "/default-profilePicture.jpg"
        }
        alt="Avatar"
      />
    </div>
  );
}

export default Avatar;

import React from "react";
import classes from "./avatar.module.css";

// por ahora user va a emular un objeto usuario que tiene la información de la foto de perfil para crear el avatar
function Avatar({ user }) {
  return (
    <>
      <img
        className={classes.avatar}
        src={
          user?.profilePicture === ""
            ? "/public/default-profilePicture.jpg"
            : user?.profilePicture
        }
      />
    </>
  );
}

export default Avatar;

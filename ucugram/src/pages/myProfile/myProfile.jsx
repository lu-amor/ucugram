import React from "react";
import classes from "./MyProfile.module.css";
import Avatar from "../../components/avatar/avatar";
import SideNavBar from "../../components/sideNavBar/sideNavBar";

function MyProfile({ user }) {
  return (
    <div className="columns">
      <SideNavBar />
      <div className="column is-10">
        <div className={classes.profileContainer}>
          <div className={classes.header}>
            <div className={classes.avatar}>
              <Avatar user={user} />
            </div>
            <div className={classes.profileInformation}>
              <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                <p style={{ font: "25px Segoe UI", marginRight: "10%" }}>
                  <strong>{user.name}</strong>
                </p>
                <button className={`button ${classes.profileButton}`}>
                  Edit profile
                </button>
              </div>
              <div className={classes.accountInformation}>
                <div className={classes.statItem}>
                  <span>
                    <strong>{user.posts}</strong> posts
                  </span>
                </div>
                <div className={classes.statItem}>
                  <span>
                    <strong>{user.friends}</strong> friends
                  </span>
                </div>
                <div className={classes.profileDescription}>
                  <p>{user.description}</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div>aca va el resto del perfil</div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;

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
              <p style={{ font: "25px Segoe UI", width: "50%" }}>
                <strong>{user.name}</strong>
              </p>
              <button className={`button ${classes.profileButton}`}>
                Edit profile
              </button>
              <div className={classes.accountInformation}>
                <p style={{ gridColumn: 1, gridRow: 1 }}>
                  <strong>{user.posts}</strong> posts
                </p>
                <p style={{ gridColumn: 2, gridRow: 1 }}>
                  <strong>{user.friends}</strong> friends
                </p>
                <div style={{ gridColumn: "1 / 4", gridRow: 2, marginTop:"15px" }}>
                  <p>
                    mini descripción del perfil 😊
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div>
            aca va el resto del perfil
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;

import React from "react";
import classes from "./FriendProfile.module.css";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import Avatar from "../../components/avatar/avatar.jsx";
import PostGrid from "../../components/postGrid/postGrid";


function FriendProfile({ user }) {
  return (
    <div className="columns">
      <SideNavBar user={user} />
      <div className="column is-10" style={{height:"100vh", overflowY:"auto"}}>
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
                  add friend
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
                <div
                  className={classes.profileDescription}
                >
                  <p>{user.description}</p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
          <div className={classes.postsContainer}> 
            <PostGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendProfile;
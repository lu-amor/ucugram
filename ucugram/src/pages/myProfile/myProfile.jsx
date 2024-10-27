import React from "react";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import classes from "./MyProfile.module.css";
import Avatar from "../../components/avatar/avatar";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import PostContainer from "../../components/postContainer/postContainer";
import PostGrid from "../../components/postGrid/postGrid";

function MyProfile({ user }) {
  return (
    <div className="columns">
      <SideNavBar />
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
          <div className={classes.postsContainer}> 
            <PostGrid />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;

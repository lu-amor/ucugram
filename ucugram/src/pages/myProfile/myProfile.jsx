import React, { useEffect, useState } from "react";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import classes from "./MyProfile.module.css";
import Avatar from "../../components/avatar/avatar";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import PostContainer from "../../components/postContainer/postContainer";
import PostGrid from "../../components/postGrid/postGrid";
import { useAuth } from "./../../context/AuthContext";
import { useProfile } from "../../context/ProfileContext";
import { useNavigate } from "react-router-dom";

function MyProfile({ user1 }) {
  const { state: authState } = useAuth();
  const navigate = useNavigate();

  const handleNotAuthenticatedUser = () => {
    navigate("./home")
  }

  return (
    <>
      {!authState.isAuthenticated && handleNotAuthenticatedUser}
      <div className="columns">
        <SideNavBar />
        <div
          className="column is-10"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <div className={classes.profileContainer}>
            <div className={classes.header}>
              <div className={classes.avatar}>
                <Avatar user={user1} />
              </div>
              <div className={classes.profileInformation}>
                <div
                  style={{ display: "flex", width: "100%", flexWrap: "wrap" }}
                >
                  <p style={{ font: "25px Segoe UI", marginRight: "10%" }}>
                    <strong>{user1.name}</strong>
                  </p>
                  <button className={`button ${classes.profileButton}`}>
                    Edit profile
                  </button>
                </div>
                <div className={classes.accountInformation}>
                  <div className={classes.statItem}>
                    <span>
                      <strong>{user1.posts}</strong> posts
                    </span>
                  </div>
                  <div className={classes.statItem}>
                    <span>
                      <strong>{user1.friends}</strong> friends
                    </span>
                  </div>
                  <div className={classes.profileDescription}>
                    <p>{user1.description}</p>
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
    </>
  );
}

export default MyProfile;

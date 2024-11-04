import React, { useState, useEffect } from "react";
import classes from "./FriendProfile.module.css";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import Avatar from "../../components/avatar/avatar.jsx";
import PostGrid from "../../components/postGrid/postGrid";
import { useProfile } from "../../context/ProfileContext";
import {
  AUTH_ACTIONS,
  useAuth,
  handleReload,
} from "../../context/AuthContext.jsx";
import { PROFILE_ACTIONS } from "./../../context/ProfileContext.jsx";
import { useGetProfile } from "../../hooks/useGetProfile.jsx";

function FriendProfile({ user }) {
  const { state: profileState, dispatch: dispatchProfile } = useProfile();
  const { state: authState, dispatch: authDispatch } = useAuth();
  const [isfriend, setIsFriend] = useState();
  const getProfile = useGetProfile();

  useEffect(() => {
    if (localStorage.getItem("friend-id") !== null) {
      dispatchProfile({ type: PROFILE_ACTIONS.LOADING });
      getProfile(localStorage.getItem("friend-id")).then(() => {
        handleReload(localStorage.getItem("token"), authDispatch).then(() => {
          console.log("authState.user: ", localStorage.getItem("token"));
          const find = authState.user.friends.find(
            (friend) => friend._id === profileState.user?._id
          );
          setIsFriend(find !== undefined);
        });
        // authDispatch({
        //   type: AUTH_ACTIONS.RELOAD,
        //   payload: {
        //     token: localStorage.getItem("token"),
        //     dispatch: authDispatch,
        //   },
        // });
      });
    } else {
      const find = authState.user.friends.find(
        (friend) => friend._id === profileState.user?._id
      );
      setIsFriend(find !== undefined);
      localStorage.setItem("friend-id", profileState.user?._id);
    }
  }, []);

  console.log("posts: ", profileState.user);
  return (
    <div className="columns">
      <>
        {profileState.loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <SideNavBar user={user} />
            <div
              className="column is-10"
              style={{ height: "100vh", overflowY: "auto" }}
            >
              <div className={classes.profileContainer}>
                <div className={classes.header}>
                  <div className={classes.avatar}>
                    <Avatar user={profileState.user} />
                  </div>
                  <div className={classes.profileInformation}>
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        flexWrap: "wrap",
                      }}
                    >
                      <p style={{ font: "25px Segoe UI", marginRight: "10%" }}>
                        <strong>{profileState.user?.username}</strong>
                      </p>
                      <button className={`button ${classes.profileButton}`}>
                        {isfriend ? (
                          <span>delete friend</span>
                        ) : (
                          <span>add friend</span>
                        )}
                      </button>
                    </div>
                    <div className={classes.accountInformation}>
                      <div className={classes.statItem}>
                        <span>
                          <strong>{profileState.posts.length}</strong> posts
                        </span>
                      </div>
                      <div className={classes.statItem}>
                        <span>
                          <strong>{profileState.user?.friends.length}</strong>{" "}
                          friends
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
                  <PostGrid posts={profileState.posts} />
                </div>
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}

export default FriendProfile;

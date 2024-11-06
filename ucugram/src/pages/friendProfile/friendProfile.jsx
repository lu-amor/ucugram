import React, { useEffect, useState } from "react";
import Avatar from "../../components/avatar/avatar.jsx";
import PostGrid from "../../components/postGrid/postGrid";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import { handleReload, useAuth } from "../../context/AuthContext.jsx";
import { useProfile } from "../../context/ProfileContext";
import { useGetProfile } from "../../hooks/useGetProfile.jsx";
import { PROFILE_ACTIONS } from "./../../context/ProfileContext.jsx";
import classes from "./FriendProfile.module.css";
import useFriend from "./../../hooks/useFriends.jsx";

function FriendProfile({ user }) {
  const { state: profileState, dispatch: dispatchProfile } = useProfile();
  const { state: authState, dispatch: authDispatch } = useAuth();
  const [isFriend, setIsFriend] = useState();
  const getProfile = useGetProfile();
  const { addFriend, removeFriend } = useFriend();

  useEffect(() => {
    const getData = async () => {
      if (localStorage.getItem("friend-id")) {
        dispatchProfile({ type: PROFILE_ACTIONS.LOADING });
        await getProfile(localStorage.getItem("friend-id"));
        await handleReload(localStorage.getItem("token"), authDispatch);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (authState.user.friends) {
      if (localStorage.getItem("friend-id") && authState.user.friends) {
        const find = authState.user.friends.find(
          (friend) => friend._id === profileState.user?._id
        );
        setIsFriend(find !== undefined);
      } else {
        const find = authState.user.friends.find(
          (friend) => friend._id === profileState.user?._id
        );
        setIsFriend(find !== undefined);
        localStorage.setItem("friend-id", profileState.user?._id);
      }
    }
  }, [profileState, authState]);

  const handleToggleFirend = async () => {
    if (isFriend) {
      const removed = await removeFriend(profileState.user._id);
      removed === true ? setIsFriend(false) : setIsFriend(isFriend);
    } else {
      const added = await addFriend(profileState.user._id);
      added === true ? setIsFriend(true) : setIsFriend(false);
    }
  }

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
                      <button className={`button ${classes.profileButton}`} onClick={() => handleToggleFirend()}>
                        {isFriend ? (
                          <span>remove friend</span>
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

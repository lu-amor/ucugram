import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/avatar/avatar.jsx";
import PostGrid from "../../components/postGrid/postGrid";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import { handleReload, useAuth } from "../../context/AuthContext.jsx";
import { useProfile } from "../../context/ProfileContext";
import { useGetProfile } from "../../hooks/useGetProfile.jsx";
import { PROFILE_ACTIONS } from "./../../context/ProfileContext.jsx";
import classes from "./FriendProfile.module.css";
import useFriend from "./../../hooks/useFriends.jsx";
import Loader from "../../components/loader/loader.jsx";

function FriendProfile() {
  const { state: profileState, dispatch: dispatchProfile } = useProfile();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { state: authState, dispatch: authDispatch } = useAuth();
  const [isFriend, setIsFriend] = useState();
  const [friendsNum, setFriendsNum] = useState();
  const getProfile = useGetProfile();
  const { addFriend, removeFriend } = useFriend();
  const navigate = useNavigate();

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

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("./home");
    }
    localStorage.removeItem("friend-id");
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  useEffect(() => {
    if (authState.user) {
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
      setFriendsNum(profileState.user?.friends.length)
    }
  }, [profileState, authState]);

  const handleToggleFriend = async () => {
    if (isFriend) {
      const removed = await removeFriend(profileState.user._id);
      if(removed === true) {
        setIsFriend(false);
        setFriendsNum(friendsNum - 1)
      } else { // no cambia
        setIsFriend(true)
      }
    } else {
      const added = await addFriend(profileState.user._id);
      if(added === true) {
        setIsFriend(true);
        setFriendsNum(friendsNum + 1)
      } else { // no cambia
        setIsFriend(false)
      }
    }
  }

  return (
    <>
      {profileState?.loading ? (
        <Loader />
      ) : (
        <>
          <div className="columns">
            <SideNavBar />
            <div
              className={`column ${windowWidth > 950 ? "is-10" : ""}`}
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
                        alignItems: "center",
                      }}
                    >
                      <p className={classes.username}>
                        <strong>{profileState.user?.username}</strong>
                      </p>
                      <button className={`button ${windowWidth < 950 ? 'is-small' : ''} ${classes.profileButton}`} onClick={() => handleToggleFriend()}>
                        {isFriend ? (
                          <span>remove friend</span>
                        ) : (
                          <span>add friend</span>
                        )}
                      </button>
                    </div>
                    <div className={classes.accountInformation}>
                      <div className={classes.stats}>
                        <div className={classes.statItem}>
                          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <strong>{profileState.posts?.length}</strong>
                            <p>{profileState.posts?.length === 1 ? " post" : " posts"}</p>
                          </div>
                        </div>
                        <div className={classes.statItem}>
                          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <strong>{profileState.user?.friends.length}</strong>{" "}
                            <p>{profileState.user?.friends.length === 1 ? "friend" : "friends"}</p>
                          </div>
                        </div>
                      </div>
                      <div className={classes.profileDescription}>
                        <p>{profileState.user?.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.divider}/>
                <div className={classes.postsContainer}>
                  <PostGrid posts={profileState.posts} user={profileState.user} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FriendProfile;

import React, { useEffect, useReducer } from "react";
import classes from "./MyProfile.module.css";
import Avatar from "../../components/avatar/avatar";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import PostGrid from "../../components/postGrid/postGrid";
import { useAuth } from "./../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../hooks/useGetProfile";
import profileReducer, { initialState } from "../../services/profileReducer";
import { useProfile } from "../../context/ProfileContext";

function MyProfile({ user1 }) {
  const { state: profileState } = useProfile();
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const getProfile = useGetProfile();

  useEffect(() => {
    const userId = authState.user?._id;
    if (userId !== undefined && userId !== null) {
      getProfile(userId);
    }
  }, [authState?.user?._id]);

  const handleNotAuthenticatedUser = () => {
    navigate("./home");
  };

  return (
    <>
      {!authState.isAuthenticated && handleNotAuthenticatedUser}
      {profileState?.loading || authState.loading ? (
        <p>Loading profile...</p> // hacer algo más lindo
      ) : (
        <>
          <div className="columns">
            <SideNavBar />
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
                        Edit profile
                      </button>
                    </div>
                    <div className={classes.accountInformation}>
                      <div className={classes.statItem}>
                        <span>
                          <strong>{profileState.posts?.length}</strong> posts
                        </span>
                      </div>
                      <div className={classes.statItem}>
                        <span>
                          <strong>{profileState.user?.friends.length}</strong> friends
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
                  {/* <img src={"http://localhost:3001/" + state.posts[0]?.imageUrl} alt="imagen 1" /> */}
                  <PostGrid posts={profileState.posts} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyProfile;

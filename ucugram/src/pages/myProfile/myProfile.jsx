import React, { useEffect, useReducer } from "react";
import classes from "./MyProfile.module.css";
import Avatar from "../../components/avatar/avatar";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import PostGrid from "../../components/postGrid/postGrid";
import { useAuth } from "./../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../../hooks/useGetProfile";
import profileReducer, { initialState } from "../../services/profileReducer";

function MyProfile({ user1 }) {
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const getProfile = useGetProfile();
  useEffect(() => {
    const userId = authState.user?._id;
    // console.log("en useeffect: " + userId);
    if(userId !== undefined && userId !== null) {
      getProfile(dispatch, userId);
      console.log(state.posts[0]);
    }
  }, [authState?.user?._id]);

  const handleNotAuthenticatedUser = () => {
    navigate("./home");
  };

  return (
    <>
      {!authState.isAuthenticated && handleNotAuthenticatedUser}
      {(state?.loading || authState.loading) ? (
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
                    <Avatar user={state.user} />
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
                        <strong>{state.user?.username}</strong>
                      </p>
                      <button className={`button ${classes.profileButton}`}>
                        Edit profile
                      </button>
                    </div>
                    <div className={classes.accountInformation}>
                      <div className={classes.statItem}>
                        <span>
                          <strong>{state.posts?.length}</strong> posts
                        </span>
                      </div>
                      <div className={classes.statItem}>
                        <span>
                          <strong>{state.user?.friends.length}</strong> friends
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
                  <img src={"http://localhost:3001/" + state.posts[0]?.imageUrl} alt="imagen 1" />
                  <PostGrid />
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

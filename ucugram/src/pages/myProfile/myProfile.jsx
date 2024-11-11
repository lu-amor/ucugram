
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/avatar/avatar";
import PostGrid from "../../components/postGrid/postGrid";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import UploadPhotoModal from "../../components/uploadPhotoModal/uploadPhotoModal";
import { useProfile } from "../../context/ProfileContext";
import { useGetProfile } from "../../hooks/useGetProfile";
import { useAuth } from "./../../context/AuthContext";
import classes from "./MyProfile.module.css";
import IonIcon from "@reacticons/ionicons";
import Loader from "../../components/loader/loader";

function MyProfile({ user1 }) {
  const { state: profileState } = useProfile();
  // const [state, dispatch] = useReducer(profileReducer, initialState);
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const getProfile = useGetProfile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
    const userId = authState.user?._id;
    if (userId !== undefined && userId !== null) {
      getProfile(userId);
    }
  }, [authState?.user?._id]);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate("./home");
    }
  }, []);

  const handleEditProfile = () => {
    navigate("/account/edit")
  }

  return (
    <>
      {profileState?.loading || authState.loading ? (
        <Loader />
      ) : (
        <>
          <div className="columns">
            <SideNavBar />
            <div
              className={`column ${windowWidth > 950 ? "is-10" : ""} `}
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
                      <button className={`button ${windowWidth < 950 ? 'is-small' : ''} ${classes.profileButton}`} onClick={handleEditProfile}>
                        Edit profile
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
{/*                         <p>{profileState.user?.description}</p>
 */}                        <p>this is a description</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.divider}/>
                <div className={classes.postsContainer}>
                  {/* <img src={"http://localhost:3001/" + state.posts[0]?.imageUrl} alt="imagen 1" /> */}
                  <PostGrid posts={profileState.posts} />
                </div>
                <div className={classes.buttonContainer}>
                  <button
                    className={classes.addPictureButton}
                    onClick={() => setIsModalOpen(true)}
                  >
                    <IonIcon name="add" size='medium' />
                  </button>
                </div>
                {isModalOpen && (
                  <UploadPhotoModal closeModal={() => setIsModalOpen(false)} />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default MyProfile;

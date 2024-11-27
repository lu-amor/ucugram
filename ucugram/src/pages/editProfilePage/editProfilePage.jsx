import React, { useEffect, useState, useRef } from "react";
import classes from "./EditProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth, handleReload } from "../../context/AuthContext";
import { PROFILE_ACTIONS, useProfile } from "../../context/ProfileContext";
import Avatar from "../../components/avatar/avatar.jsx";
import SideNavBar from "./../../components/sideNavBar/sideNavBar";
import { useGetProfile } from "../../hooks/useGetProfile.jsx";
import useUpdateProfileInfo from "./../../hooks/useUpdateProfileInfo.jsx";
import ProfileImgPreview from "../../components/profileImagePreview/profileImgPreview.jsx";
import Loader from "../../components/loader/loader.jsx";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  const { state: profileState, dispatch: dispatchProfile } = useProfile();
  const getProfile = useGetProfile();
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [description, setDescription] = useState("");
  const { updateProfile, loading, error } = useUpdateProfileInfo();
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
    const reload = async () => {
      if (authState.user) {
        dispatchProfile({ type: PROFILE_ACTIONS.LOADING });
        await getProfile(authState.user._id);
        setUsername(authState.user.username);
        setDescription(authState.user.description);
      }
    };
    reload();
  }, [authState]);

  const goHome = () => {
    navigate("/myProfile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInfo = { username, profilePicture, description };
    console.log("entra al handle");
    const result = await updateProfile(newInfo);
    result === true ? navigate("/myProfile") : window.alert("algo salió mal");
  };

  return (
    <>
      {profileState?.loading || authState.loading ? (
        <Loader />
      ) : (
        <>
          <div className="columns">
            <SideNavBar />
            <div
              className={`column ${windowWidth > 950 ? "is-10" : ""}`}
              style={{ height: "110vh", overflowY: "auto" }}
            >
              <div className={classes.pageContainer}>
                <div>
                  <div className={classes.header}>
                    <h1 className="title is-1 has-text-info">Edit Profile</h1>
                  </div>
                  <div className={classes.pictureContainer}>
                    <div className={classes.showPicture}>
                      <div className={classes.avatar}>
                        <Avatar user={profileState.user} />
                      </div>
                      <div className={classes.container}>
                        <p className={classes.username}>
                          <strong>{profileState.user?.username}</strong>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    height: "100%",
                  }}
                >
                  <div className={classes.field}>
                    <label className="label">username</label>
                    <input
                      className="input"
                      type="text"
                      defaultValue={profileState.user?.username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                  <div className={classes.field}>
                    <label className="label">description</label>
                    <input
                      className="input"
                      type="text"
                      defaultValue={authState.user?.description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></input>
                  </div>
                  <div className={classes.field}>
                    <label className="label">profile picture</label>
                    <input
                      className="input"
                      type="text"
                      defaultValue={authState.user?.profilePicture}
                      onChange={(e) => setProfilePicture(e.target.value)}
                    ></input>
                  </div>
                  <div className={classes.buttonsContainer}>
                    <button
                      className="button"
                      id={classes.profileButton}
                      onClick={goHome}
                    >
                      cancel
                    </button>
                    <button
                      className="button"
                      id={classes.profileButton}
                      type="submit"
                    >
                      update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

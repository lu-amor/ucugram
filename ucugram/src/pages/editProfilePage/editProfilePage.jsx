import React, { useEffect, useState } from "react";
import classes from "./EditProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PROFILE_ACTIONS, useProfile } from "../../context/ProfileContext";
import Avatar from "../../components/avatar/avatar.jsx";
import SideNavBar from "./../../components/sideNavBar/sideNavBar";
import { useGetProfile } from "../../hooks/useGetProfile.jsx";
import useUpdateProfileInfo from "./../../hooks/useUpdateProfileInfo.jsx";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  const { state: profileState, dispatch: dispatchProfile } = useProfile();
  const getProfile = useGetProfile();
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const { updateProfile, loading, error } = useUpdateProfileInfo();

  useEffect(() => {
    const reload = async () => {
      if (authState.user._id) {
        dispatchProfile({ type: PROFILE_ACTIONS.LOADING });
        await getProfile(authState.user._id);
      }
    };

    reload();
  }, [authState.user._id]);

  const goHome = () => {
    navigate("/myProfile");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newInfo = { username, profilePicture };
    console.log("entra al handle");
    const result = await updateProfile(newInfo);
    result === true ? navigate("/myProfile") : window.alert("algo salió mal");
  };

  return (
    <>
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
              <div className={classes.pageContainer}>
                <div>
                  <div className={classes.header}>
                    <h1 className="title is-1">Edit Profile</h1>
                  </div>
                  <div className={classes.pictureContainer}>
                    <div className={classes.showPicture}>
                      <div className={classes.avatar}>
                        <Avatar user={profileState.user} />
                      </div>
                      <p style={{ font: "25px Segoe UI", marginRight: "10%" }}>
                        <strong>{profileState.user?.username}</strong>
                      </p>
                    </div>
                    <button className={`button`} id={classes.profileButton}>
                      Change picture
                    </button>
                  </div>
                </div>
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    height:"100%"
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
                      defaultValue={"default description"}
                      onChange={(e) => setUsername(e.target.value)}
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

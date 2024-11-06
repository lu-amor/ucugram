import React, { useEffect, useState } from "react";
import classes from "./EditProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { PROFILE_ACTIONS, useProfile } from "../../context/ProfileContext";
import Avatar from "../../components/avatar/avatar.jsx";
import SideNavBar from "./../../components/sideNavBar/sideNavBar";
import { useGetProfile } from "../../hooks/useGetProfile.jsx";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  const { state: profileState, dispatch: dispatchProfile } = useProfile();
  const getProfile = useGetProfile();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const reload = async () => {
      if (authState.user._id) {
        dispatchProfile({ type: PROFILE_ACTIONS.LOADING });
        await getProfile(authState.user._id);
      }
    };

    reload();
  }, [authState.user._id]);

  console.log("profileState: ", profileState);
  const handleSubmit = () => {};
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
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                    alignItems: "flex-start",
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
                </form>
                <div className={classes.buttonsContainer}> 
                    <button className="button is-danger" id={classes.profileButton}>cancel</button>
                    <button className="button is-primary" id={classes.profileButton}>update</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

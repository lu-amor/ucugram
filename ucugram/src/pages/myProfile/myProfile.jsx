import React, {useState, useEffect} from "react";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import classes from "./MyProfile.module.css";
import Avatar from "../../components/avatar/avatar";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import PostGrid from "../../components/postGrid/postGrid";

function MyProfile({ user }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  return (
    <div className="columns">
      <SideNavBar />
      {windowWidth > 950 ? (
      <div className="column is-10" style={{height:"100vh", overflowY:"auto"}}>
        <div className={classes.profileContainer}>
          <div className={classes.header}>
            <div className={classes.topInfo}>
              <div className={classes.avatar}>
                <Avatar user={user} />
              </div>
              <div className={`is-flex is-flex-direction-column`}>
                <div className={`mb-1 mt-1 ${classes.topTopInfo}`}>
                  <p style={{ font: "25px Segoe UI", marginRight: "20px" }}>
                    <strong>{user.name}</strong>
                  </p>
                  <button className={`button ${classes.profileButton} has-text-danger has-text-weight-bold`}>
                      Edit profile
                  </button>
                </div>
                <div className={classes.accountInformation}>
                  <div className={classes.statItem}>
                    <span>
                      <strong>{user.posts}</strong> posts
                    </span>
                  </div>
                  <div className={classes.statItem}>
                    <span>
                      <strong>{user.friends}</strong> friends
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.profileInformation}>
              <div className={classes.accountInformation}>
                <div className={classes.profileDescription}>
                  <p>{user.description}</p>
                </div>
              </div>
            </div>
          </div>
            <div className={classes.postsContainer}> 
            <PostGrid />
          </div>
        </div>
      </div>
      ) : (
        <div className={classes.profileContainer}>
          <div className={classes.header}>
            <div className="is-flex is-flex-direction-row mb-1">
              <div className={classes.avatar}>
                <Avatar user={user} />
              </div>
              <div>
                <div className={classes.accountInformation}>
                  <div className={classes.statItem}>
                    <span>
                      <strong>{user.posts}</strong> posts
                    </span>
                    </div>
                    <div className={classes.statItem}>
                      <span>
                        <strong>{user.friends}</strong> friends
                      </span>
                    </div>
                </div>
                <button className={`button ${classes.profileButton} has-text-danger has-text-weight-bold is-small`}>
                  Edit profile
                </button>
              </div>
            </div>
            <div className={classes.topInfo}>
              <div style={{ display: "flex", width: "100%", flexWrap: "wrap" }}>
                <p style={{ font: "25px Segoe UI", marginTop: '10px' }}>
                  <strong>{user.name}</strong>
                </p>
                <div className={classes.profileDescription}>
                  <p>{user.description}</p>
                </div>
              </div>
            </div>
          <div className={classes.postsContainer}> 
          <PostGrid />
        </div>
      </div>
      </div>
      )}
    </div>
  );
}

export default MyProfile;

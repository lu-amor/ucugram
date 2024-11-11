import React, { useState, useEffect } from "react";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import classes from "./feedPage.module.css";
import Post from "../../components/post/post";
import { useAuth } from "../../context/AuthContext";
import SuggestionsPreview from "./../../components/suggestionsPreview/suggestionsPreview";
import Loader from "../../components/loader/loader";
import Icon from '@mdi/react';
import { mdiEmoticonSadOutline } from '@mdi/js';

const FeedPage = () => {
  const { posts, loading, error } = useFetchPosts();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { state: authState } = useAuth();

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

  return (
    <>
      <div className="columns mr-0">
        <SideNavBar />
        {/* {windowWidth > 950 ? ( */}
          <div className={`column is-10 ${classes.feedContent}`}>
            <div>
              {loading && <Loader />}
              {error && <div className={classes.errorMessage}>Error loading posts<Icon path={mdiEmoticonSadOutline} size={0.9} />
              </div>}
              {!posts && (
                <>
                  <SuggestionsPreview suggestions={posts} />
                  <div className={classes.postContainer}>
                    {posts.map((post) => {
                      return <Post key={post._id} post={post} />;
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
      </div>
    </>
  );
};

export default FeedPage;

import React, { useState, useEffect } from "react";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import classes from "./feedPage.module.css";
import PostContainer from "../../components/postContainer/postContainer";
import { useAuth } from "../../context/AuthContext";
import SuggestionsPreview from "./../../components/suggestionsPreview/suggestionsPreview";

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
      <div className="columns  mr-0">
        <SideNavBar />
        {windowWidth > 950 ? (
          <div className={`column is-10 ${classes.feedContent}`}>
            <div>
              {loading && <div>Loading posts...</div>}
              {error && <div>Error loading posts!</div>}
              {posts && (
                <>
                  <SuggestionsPreview suggestions={posts} />
                  <div className={classes.postContainer}>
                    {posts.map((post) => {
                      return <PostContainer key={post._id} post={post} />;
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className={`${classes.feedContent}`}>
            {/* <SuggestionsPreview suggestions={posts} /> */}
            {loading && <div>Loading posts...</div>}
            {error && <div>Error loading posts!</div>}
            {posts && (
              <>
                <SuggestionsPreview suggestions={posts} />
                <div className={classes.postContainer}>
                  {posts.map((post) => (
                    <PostContainer key={post.id} post={post} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default FeedPage;

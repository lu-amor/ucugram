import React from "react";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import SideNavBar from "../../components/sideNavBar/sideNavBar";
import classes from "./feedPage.module.css";
import PostContainer from "../../components/postContainer/postContainer";

const FeedPage = () => {
  const { posts, loading, error } = useFetchPosts();

  return (
    <div className="columns">
      <SideNavBar />
      <div className={`column is-10 ${classes.feedContent}`}>
        <div>
          {loading && <div>Loading posts...</div>}
          {error && <div>Error loading posts!</div>}
          {posts && (
            <div className={classes.postContainer}>
              {posts.map((post) => (
                <PostContainer key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;

import React from "react";
import PostItem from "ucugram/src/components/postItem/postItem.jsx";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import classes from "ucugram/src/components/postGrid/postGrid.module.css"


const PostGrid = () => {
  const { posts, loading, error } = useFetchPosts();

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts!</div>;

  return (
    <div className={`${classes.gridContainer}`}>
      {posts.map((post) => (
        <PostItem 
          key={post.id} 
          post={post}
        />
      ))}
    </div>
  );
};

export default PostGrid;


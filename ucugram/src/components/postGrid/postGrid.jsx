import React from "react";
import PostItem from "ucugram/src/components/postItem/postItem.jsx";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import classes from "ucugram/src/components/postGrid/postGrid.module.css"


const PostGrid = ( {posts, user} ) => {

  return (
    <div className={`${classes.gridContainer}`}>
          {posts?.map((post, index) => (
            <PostItem 
              key={index} 
              post={post}
              user={user}
            />
          ))}
    </div>
  );
};

export default PostGrid;


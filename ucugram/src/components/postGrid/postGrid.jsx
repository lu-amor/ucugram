import React from "react";
import PostItem from "ucugram/src/components/postItem/postItem.jsx";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import "ucugram/src/components/postGrid/postGrid.css"


const PostGrid = ( {posts} ) => {

  return (
    <div className="grid-container">
          {posts?.map((post, index) => (
            <PostItem 
            key={index} 
            post={post}/>
          ))}
    </div>
  );
};

export default PostGrid;


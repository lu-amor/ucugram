import React, { useState, useEffect } from "react";
import PostItem from "ucugram/src/components/postItem/postItem.jsx";
import "ucugram/src/components/postGrid/postGrid.css"

const url = 'http://localhost:3000/posts';

const PostGrid = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="grid-container">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;


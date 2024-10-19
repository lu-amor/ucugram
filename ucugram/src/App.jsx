import React from "react";
import PostContainer from "./components/postContainer/postContainer";
import useFetchPosts from "ucugram/src/hooks/useFetchPosts.jsx";
import "bulma/css/bulma.min.css";
import "ucugram/src/App.css"; 


function App() {
  const { posts, loading, error } = useFetchPosts();

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts!</div>;

  return (
    <div className="post-container">
          {posts.map((post) => (
            <PostContainer 
            key={post.id} 
            post={post} />
          ))}
    </div>
  );
}

export default App;

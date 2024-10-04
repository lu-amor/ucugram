// import React from 'react'
// import FeedPage from './pages/feedPage/feedPage'
// import MyProfile from './pages/myProfile/myProfile'
// import FriendProfile from './pages/friendProfile/friendProfile'
// import SideNavBar from './components/sideNavBar/sideNavBar'

// import './App.css'

// function App() {
//   return (
//     <>
//       <FeedPage />
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react';
import PostGrid from './components/postGrid/postGrid.jsx';
import PostModal from './components/postModal/PostModal.jsx';

const url = 'http://localhost:3000/posts';

const App = () => {
  const [posts, setPosts] = useState([]);    
  const [selectedPost, setSelectedPost] = useState(null); 

  const fetchPosts = async () => {
    try {
      const response = await fetch(url, { method: "GET" });
      const data = await response.json();
      setPosts(data); 
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); 

  return (
    <div className="app">
      <h1>UCUgram</h1>
      <PostGrid posts={posts} onPostClick={setSelectedPost} />
      {selectedPost && <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />}
    </div>
  );
};

export default App;

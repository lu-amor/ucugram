import React from 'react';
import PostCard from 'ucugram/src/components/postCard/postCard.jsx';
import 'ucugram/src/components/postGrid/postGrid.css';

const PostGrid = ({ posts, onPostClick }) => {
  return (
    <div className="grid-container">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onClick={() => onPostClick(post)} />
      ))}
    </div>
  );
};

export default PostGrid;

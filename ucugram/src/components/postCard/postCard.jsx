import React from 'react';
import 'ucugram/src/components/postCard/postCard.css';

const PostCard = ({ post, onClick }) => {
  return (
    <div className="post-card" onClick={onClick}>
      <img src={post.imageUrl} alt={post.description} className="post-image" />
      <div className="post-info">
        <span>{post.likes} likes</span>
        <span>{post.comments.length} comments</span>
      </div>
    </div>
  );
};

export default PostCard;

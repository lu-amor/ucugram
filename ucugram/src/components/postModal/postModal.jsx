import React from 'react';
import PostActions from 'ucugram/src/components/postActions/postActions.jsx';
import 'ucugram/src/components/postModal/postModal.css';

const PostModal = ({ post, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <img src={post.imageUrl} alt={post.description} className="modal-image" />
        <p>{post.description}</p>
        <PostActions />
        <div className="comments-section">
          {post.comments.map((comment) => (
            <p key={comment.id}>{comment.text}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostModal;

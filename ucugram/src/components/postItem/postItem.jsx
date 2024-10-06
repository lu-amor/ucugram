
import React, { useState } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import PostModal from 'ucugram/src/components/postModal/postModal.jsx';
import "ucugram/src/components/postItem/postItem.css";

const PostItem = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
        <div className="post-card card" 
          onClick={handleModalOpen}>
          <div className="card-image post-image">
            <figure className="image is-4by3">
              <img src={post.imageUrl} 
                alt={post.description} />
            </figure>
          </div>
          {/* <div className="card-content post-info">
            <p className="has-text-weight-semibold">{post.description}</p>
            <p className="has-text-right">
              <LikeButton postId={post.id} initialLikes={post.likes} />
            </p>
          </div> */}
      </div>

      <PostModal post={post} isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default PostItem;

import React, { useState } from "react";
import PostModal from "ucugram/src/components/postModal/postModal.jsx";
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
      <div className="post-card card" onClick={handleModalOpen}>
        <div className="card-image post-image">
          <figure className="image is-3by3">
            <img src={"http://localhost:3001/" + post.imageUrl} alt={post.description === undefined ? "not available" : post.description} />
          </figure>
        </div>
      </div>
      {isModalOpen && <PostModal post={post} onClose={handleModalClose}/>}
    </div>
  );
};

export default PostItem;

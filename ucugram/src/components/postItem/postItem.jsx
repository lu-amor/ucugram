import React, { useState } from "react";
import PostModal from "ucugram/src/components/postModal/postModal.jsx";
import classes from "ucugram/src/components/postItem/postItem.module.css";

const PostItem = ({ post, user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={`${classes.postCard} card`} onClick={handleModalOpen}>
        <div className={`${classes.postImage}`}>
          <figure className={`${classes.imagen} image is-square`}>
            <img src={"http://localhost:3001/" + post.imageUrl} alt={post.description === undefined ? "not available" : post.description} />
          </figure>
        </div>
      </div>
      {isModalOpen && <PostModal post={post} user={user} onClose={handleModalClose}/>}
    </div>
  );
};

export default PostItem;

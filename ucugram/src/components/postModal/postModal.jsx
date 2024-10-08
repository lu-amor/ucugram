import React from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import CommentButton from "../commentButton/commentButton";
import CommentInput from "../commentInput/commentInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import './postModal.css';


const PostModal = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>

      <button 
          className="modal-close is-large"  
          aria-label="close" 
          onClick={onClose} >
      </button>

      <div className="modal-content">

        <div className="modal-card-body">
          <figure className="pic is-4by3">
            <img src={post.imageUrl} alt={post.description} />
          </figure>

          <div className="data-container">
              <div className="post-header">
                <h3><strong>{post.user}</strong></h3>
              </div>


              <p className="pic-description"><strong>{post.user}</strong> {post.description}</p>

              <ul className="comments-section">
                {post.comments.map((comment) => (
                  <li 
                  key={comment.id}>
                  <p><strong>{comment.user}</strong> {comment.text} </p>
                  </li>
                  ))}
              </ul>
              

              <div className="buttons is-centered mt-4">

                  <LikeButton className="like-section" postId={post.id} initialLikes={post.likes} />

                  <FontAwesomeIcon className="share-button" icon={faShare}/>

                  <CommentButton className="comment-button" postId={post.id} />

              </div> 

          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;

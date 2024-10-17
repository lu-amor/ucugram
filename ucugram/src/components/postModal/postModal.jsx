import React,  { useRef, useState } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import CommentButton from "../commentButton/commentButton";
import Avatar from 'ucugram/src/components/avatar/avatar.jsx'
// import CommentInput from "../commentInput/commentInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// faHeart, faComment,
import {  faShare } from '@fortawesome/free-solid-svg-icons';
import './postModal.css';


const PostModal = ({ post, isOpen, onClose }) => {
  const imgRef = useRef(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 'auto', height: 'auto' });
  
  
  if (!isOpen || !post) return null;

  const handleImageLoad = () => {
    const img = imgRef.current;
    if (img) {
      const maxModalWidth = 900;  
      const maxModalHeight = 600; 
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      
      if (imgWidth > maxModalWidth || imgHeight > maxModalHeight) {
        setImgDimensions({
          width: imgWidth > maxModalWidth ? '90%' : `${imgWidth}px`,
          height: imgHeight > maxModalHeight ? '90%' : `${imgHeight}px`,
        });
      } else {
        setImgDimensions({
          width: `${imgWidth}px`,
          height: `${imgHeight}px`,
        });
      }
    }
  };

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>

      <button 
          className="modal-close is-large has-text-white"  
          aria-label="close" 
          onClick={onClose} >
      </button>

      <div className="modal-content" style={{ width: imgDimensions.width, height: imgDimensions.height }}>

        <div className="modal-card-body">
          <figure className="pic is-4by3">
            <img src={post.imageUrl} alt={post.description} onLoad={handleImageLoad} />
          </figure>

          <div className="data-container p-4">
              
              <div className="post-header is-flex is-justify-content-space-between">
                <div className="user-info is-flex is-align-items-center">
                  <Avatar className="user-avatar" user={post.user} ></Avatar>
                  <h3 className="ml-2" ><strong>{post.user}</strong></h3>
                </div>
                <p className="post-date">{post.date}</p>
              </div>


              <p className="pic-description mt-3"><strong>{post.user}</strong> {post.description}</p>

              <ul className="comments-section mt-4">
                {post.comments.map((comment) => (
                  <li key={comment.id} className="mb-2">
                  <p><strong>{comment.user}</strong> {comment.text} </p>
                  </li>
                  ))}
              </ul>
              

              <div className="buttons is-centered mt-4">

                  <LikeButton className="like-section" postId={post.id} initialLikes={post.likes} />

                  <FontAwesomeIcon className="share-button ml-3" icon={faShare}/>

                  <CommentButton className="comment-button ml-3" postId={post.id} />

              </div> 

          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;

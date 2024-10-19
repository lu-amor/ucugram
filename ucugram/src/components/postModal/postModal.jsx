import React,  { useRef, useState, useEffect } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import CommentButton from "../commentButton/commentButton";
import Avatar from 'ucugram/src/components/avatar/avatar.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faShare } from '@fortawesome/free-solid-svg-icons';
import './postModal.css';

const PostModal = ({ post, isOpen, onClose }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isOpen || !post) return null;

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <button 
          className="modal-close is-large has-text-white"  
          aria-label="close" 
          onClick={onClose} >
      </button>
      <div className="modal-content" >
        <div className="modal-card-body p-0">
          <figure className="image is-square">
            <img src={post.imageUrl} alt={post.description}  />
          </figure>

          {windowWidth > 580 ? (
            <div className="data-container p-4">
                <div className="post-header is-flex is-justify-content-space-between">
                  <div className="user-info is-flex is-align-items-center">
                    <Avatar className="user-avatar" user={post.user} ></Avatar>
                    <h3 className="ml-2" ><strong className="has-text-white">{post.user}</strong></h3>
                  </div>
                  <p className="post-date">{post.date}</p>
                </div>
                <p className="pic-description mt-3"><strong className="has-text-white">{post.user}</strong> {post.description}</p>

                <ul className="comments-section mt-4">
                  {post.comments.map((comment) => (
                    <li key={comment.id} className="mb-2">
                    <p><strong className="has-text-white">{comment.user}</strong> {comment.text} </p>
                    </li>
                    ))}
                </ul>
                <div className="buttons is-centered mb-1 mt-6">
                    <LikeButton className="like-section" postId={post.id} initialLikes={post.likes} />
                    <FontAwesomeIcon className="share-button ml-3" icon={faShare}/>
                    <CommentButton className="comment-button ml-3" postId={post.id} />
                </div> 
            </div>
          ) : (
            <div className="data-container p-4">
                <div className="buttons is-centered mb-5">
                  <LikeButton className="like-section" postId={post.id} initialLikes={post.likes} />
                  <FontAwesomeIcon className="share-button ml-3" icon={faShare}/>
                  <CommentButton className="comment-button ml-3" postId={post.id} />
                </div> 
                <div className="post-header is-flex is-justify-content-space-between">
                  <div className="user-info is-flex is-align-items-center">
                    <Avatar className="user-avatar" user={post.user} ></Avatar>
                    <h3 className="ml-2" ><strong className="has-text-white">{post.user}</strong></h3>
                  </div>
                  <p className="post-date">{post.date}</p>
                </div>
                <p className="pic-description mt-3"><strong className="has-text-white">{post.user}</strong> {post.description}</p>

                <ul className="comments-section mt-4">
                  {post.comments.map((comment) => (
                    <li key={comment.id} className="mb-2">
                    <p><strong className="has-text-white">{comment.user}</strong> {comment.text} </p>
                    </li>
                    ))}
                </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModal;

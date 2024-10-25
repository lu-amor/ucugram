import React,  { useRef, useState, useEffect } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import CommentButton from "../commentButton/commentButton";
import Icon from '@mdi/react';
import { mdiShareVariant } from '@mdi/js';
import Avatar from 'ucugram/src/components/avatar/avatar.jsx'
import useComment from 'ucugram/src/hooks/useComment';
import CommentInput from 'ucugram/src/components/commentInput/commentInput.jsx';
import classes from './postModal.module.css';

const PostModal = ({ post, isOpen, onClose }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { isCommentVisible, toggleCommentVisibility, hideComment } = useComment();
  const likeButtonRef = useRef(null); 

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDoubleClick = () => {
    if (likeButtonRef.current !== null) {
      likeButtonRef.current.click(); // simulo el click en el botón de like
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className={`modal ${classes.modalStyle} ${isOpen ? "is-active" : ""}`}>
      <div className={`modal-background`} onClick={onClose}></div>
      <button 
          className={`${classes.modalClose} is-large has-text-white`}  
          aria-label="close" 
          onClick={onClose} >
      </button>
      <div className={`modal-content ${classes.modalContent}`} >
        <div className={`${classes.modalCardBody} p-0`}>
          <figure className="image is-square" onDoubleClick={handleDoubleClick}>
            <img src={post.imageUrl} alt={post.description}  />
          </figure>

          {windowWidth > 962 ? (
            <div className={`${classes.dataContainer} p-4`}>
              <div className={`${classes.postText}`}>
                <div className={`${classes.postHeader} is-flex is-justify-content-space-between`}>
                  <div className={`${classes.userInfo} is-flex is-align-items-center`}>
                    <Avatar className={`${classes.userAvatar}`} user={post.user} ></Avatar>
                    <h3 className="ml-2" ><strong className="has-text-white">{post.user}</strong></h3>
                  </div>
                  <p className={`${classes.postDate}`}>{post.date}</p>
                </div>
                <p className={`${classes.picDescription} mt-3`}><strong className="has-text-white mr-1 has-text-weight-bold">{post.user}</strong> {post.description}</p>

                <ul className={`${classes.commentsSection} mt-4`}>
                  {post.comments.map((comment) => (
                    <li key={comment.id} className="mb-2">
                    <p><strong className="has-text-white has-text-weight-bold">{comment.user}</strong> {comment.text} </p>
                    </li>
                    ))}
                </ul>
              </div>
              <div className="buttons mb-3 mt-1">
                  <LikeButton className={`${classes.likeSection}`} ref={likeButtonRef} postId={post.id} initialLikes={post.likes} modal={true}/>
                  <CommentButton className="ml-3" postId={post.id} toggleCommentVisibility={toggleCommentVisibility}/>
                  <Icon path={mdiShareVariant} size={1.4} className="ml-auto mr-4" color='#ea5b0c' />
              </div>

              {isCommentVisible && (
                <div className={`${classes.commentInputSection}`}>
                  <CommentInput postId={post.id} handleCommentPublished={hideComment} />
                </div>
              )}
            </div>
          ) : (
            <div className={`${classes.dataContainer} p-4`}>
              <div className="buttons mt-1 mb-2">
                  <LikeButton className={`${classes.likeSection}`} ref={likeButtonRef} postId={post.id} initialLikes={post.likes} modal={true}/>
                  <CommentButton className="ml-3" postId={post.id} toggleCommentVisibility={toggleCommentVisibility}/>
                  <Icon path={mdiShareVariant} size={1.4} className="ml-auto" color='#ea5b0c' />
              </div>
              {isCommentVisible && (
                <div className={`${classes.commentInputSection} mb-4`}>
                  <CommentInput postId={post.id} handleCommentPublished={hideComment} />
                </div>
              )}
                <div className={`${classes.postHeader} is-flex is-justify-content-space-between`}>
                  <div className={`${classes.userInfo} is-flex is-align-items-center`}>
                    <Avatar className={`${classes.userAvatar}`} user={post.user} ></Avatar>
                    <h3 className="ml-2"><strong className="has-text-white">{post.user}</strong></h3>
                  </div>
                  <p className={`${classes.postDate}`}>{post.date}</p>
                </div>
                <p className={`${classes.picDescription} mt-3`}><strong className="has-text-white">{post.user}</strong> {post.description}</p>

                <ul className={`${classes.commentsSection} mt-4`}>
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

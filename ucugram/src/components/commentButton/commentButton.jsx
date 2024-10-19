import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import CommentInput from '../commentInput/commentInput'; 
import useComment from 'ucugram/src/hooks/useComment'; 

const CommentButton = ({ postId}) => {
  const { isCommentVisible, toggleCommentVisibility, hideComment } = useComment();

  const handleCommentPublished = () => {
    hideComment(); 
  };

  return (
    <>
      <button className="comment-button" onClick={toggleCommentVisibility}>
        <FontAwesomeIcon icon={faComment} />
      </button> 

      {isCommentVisible && (
        <div className={`comment-input ${isCommentVisible ? "visible" : ""}`}>
          <CommentInput postId={postId} handleCommentPublished={handleCommentPublished}/>
        </div>
      )}
    </>
  );
};

export default CommentButton;

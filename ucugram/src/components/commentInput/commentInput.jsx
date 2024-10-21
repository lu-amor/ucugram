import React, { useState } from "react";
import UseAddComment from "ucugram/src/hooks/useAddComment.jsx";
import classes from "ucugram/src/components/commentInput/commentInput.module.css";
import Icon from '@mdi/react';
import { mdiSend, mdiLoading } from '@mdi/js';

export default function CommentInput({ postId, handleCommentPublished }) {
    // const [comments, setComments] = useState([]);

    const [inputValue, setInputValue] = useState("");
    const { addComment, loading, error } = UseAddComment();
  
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputValue.trim() !== "") {
          
          const newComment = {
            //id: Date.now(),  // Generar un ID temporal
            user: "currentUser",  //  poner el usuario actual
            text: inputValue
          };

          await addComment(postId, newComment);  
          setInputValue("");
        }
    };

  return (
    <form onSubmit={handleSubmit}>
      {/* textarea o input */}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a comment..."
        className={`${classes.inputHolder} is-small has-text-white has-text-weight-bold`}
        disabled={loading}
      />

      <button 
        type="submit" 
        className={`button ${classes.publishButton} is-small is-danger has-text-white`}
        onClick={handleCommentPublished}
        disabled={loading}>
        {loading ? <Icon path={mdiLoading} size={0.7} className={classes.spinner} /> : <Icon path={mdiSend} size={0.7} />}
      </button>

      {error && <div>{error}</div>}
    </form>
  );
}
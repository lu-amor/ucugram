import React, { useState } from "react";
import UseAddComment from "ucugram/src/hooks/useAddComment.jsx";
import "ucugram/src/components/commentInput/commentInput.css";

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
      <textarea
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a comment..."
        className="input_holder"
        disabled={loading}
      />

      <button 
        type="submit" 
        className="publish-button"
        onClick={handleCommentPublished}
        disabled={loading}>
        {loading ? 'Publishing...' : 'Publish'}
      </button>

      {error && <div className="error-message">{error}</div>}

    </form>
  );
}
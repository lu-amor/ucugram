import React, { useState } from "react";
import useAddComment from "ucugram/src/hooks/useAddComment.jsx";
import "ucugram/src/components/commentInput/commentInput.css";
import Icon from "@mdi/react";
import { useAuth } from "./../../context/AuthContext";
import { mdiSend, mdiLoading } from "@mdi/js";

export default function CommentInput({ postId, handleCommentPublished }) {
  const [inputValue, setInputValue] = useState("");
  const { addComment, loading, error } = useAddComment();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const content = {
        content: inputValue
      };

      const result = await addComment(content, postId);
      console.log("id: ", result._id);
      if (result._id !== undefined) {
        handleCommentPublished(result)
      }
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a comment..."
        className="input_holder is-small has-text-white has-text-weight-bold"
        disabled={loading}
      />

      <button
        type="submit"
        className="button publish-button is-small is-danger has-text-white"
        disabled={loading}
      >
        {loading ? (
          <Icon path={mdiLoading} size={0.7} className="spinner" />
        ) : (
          <Icon path={mdiSend} size={0.7} />
        )}
      </button>

      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

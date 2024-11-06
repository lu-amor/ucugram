import React, { useState } from "react";
import classes from "ucugram/src/components/commentInput/commentInput.module.css";
import useAddComment from "ucugram/src/hooks/useAddComment.jsx";
import Icon from "@mdi/react";
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
        content: inputValue,
      };

      const result = await addComment(content, postId);
      console.log("id: ", result._id);
      if (result._id !== undefined) {
        handleCommentPublished(result);
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
        className={`${classes.inputHolder} is-small has-text-info has-text-weight-bold`}
        disabled={loading}
      />
      <button
        type="submit"
        className={`button ${classes.publishButton} is-small is-danger has-text-white`}
        disabled={loading}
      >
        {loading ? (
          <Icon path={mdiLoading} size={0.7} className="spinner" />
        ) : (
          <Icon path={mdiSend} size={0.7} />
        )}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
}

import React from "react";
import useLike from "ucugram/src/hooks/useLike.jsx";

const LikeButton = ({ postId, initialLikes }) => {
  const { likes, isLiked, toggleLike } = useLike(initialLikes, postId);

  return (
    <div>
      <button className={`button ${isLiked ? "is-danger" : ""}`} 
      onClick={toggleLike}>
        {isLiked ? "❤️" : "🤍"} {likes}
      </button>
    </div>
  );
};

export default LikeButton;

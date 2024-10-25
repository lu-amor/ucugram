import React, { forwardRef, useEffect } from "react";
import useLike from "ucugram/src/hooks/useLike.jsx";
import Icon from "@mdi/react";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";

const LikeButton = forwardRef(({ postId, modal, initialLikes }, ref) => {
  const { likes, isLiked, toggleLike } = useLike(initialLikes, postId);

  if (modal) {
    return (
      <div>
        <button
          ref={ref}
          className={`button ${isLiked ? "is-info" : ""}`}
          style={{ borderRadius: "8px", color: isLiked ? "#ffffff" : "#173363" }}
          onClick={toggleLike}
        >
          {isLiked ? (
            <Icon path={mdiHeart} size={1} color="#ea5b0c" className="mr-2" />
          ) : (
            <Icon
              path={mdiHeartOutline}
              size={1}
              color="#ea5b0c"
              className="mr-1"
            />
          )}{" "}
          {likes}
        </button>
      </div>
    );
  } else {
    return (
      <div className="is-flex is-align-items-center">
        <button ref={ref} onClick={toggleLike}>
          {isLiked ? (
            <Icon
              path={mdiHeart}
              size={1.7}
              color="#ea5b0c"
              className="mr-2"
              onClick={toggleLike}
            />
          ) : (
            <Icon
              path={mdiHeartOutline}
              size={1.8}
              color="#ea5b0c"
              className="mr-1"
              onClick={toggleLike}
            />
          )}{" "}
        </button>
        <p style={{ fontSize: "20px", color: "#173363", fontWeight: "700" }}>
          {likes}
        </p>
      </div>
    );
  }
});

export default LikeButton;

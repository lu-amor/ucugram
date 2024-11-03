import React, { forwardRef, useEffect, useState } from "react";
import useLike from "ucugram/src/hooks/useLike.jsx";
import Icon from "@mdi/react";
import { mdiHeart, mdiHeartOutline } from "@mdi/js";

const LikeButton = forwardRef(({ post, modal, initialLikes }, ref) => {
  const { likes, isLiked, toggleLike } = useLike(post);
  if (modal) {
    return (
      <div>
        <button
          ref={ref}
          className={`button ${isLiked ? "is-primary" : ""}`}
          style={{ borderRadius: "8px" }}
          onClick={toggleLike}
        >
          {isLiked ? (
            <Icon path={mdiHeart} size={1} color="#ea5b0c" className="mr-2" />
          ) : (
            <Icon
              path={mdiHeartOutline}
              size={1}
              color="#173363"
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
            />
          ) : (
            <Icon
              path={mdiHeartOutline}
              size={1.8}
              color="#ea5b0c"
              className="mr-1"
            />
          )}{" "}
        </button>
        <p style={{ fontSize: "20px", color: "white", fontWeight: "700" }}>
          {likes}
        </p>
      </div>
    );
  }
});

export default LikeButton;

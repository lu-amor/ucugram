import { useState } from "react";

const useLike = (initialLikes, postId) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked(!isLiked);
  };

  return {
    likes,
    isLiked,
    toggleLike,
  };
};

export default useLike;

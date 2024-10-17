import { useState } from "react";

const useFollow = (initialFollows, userId) => {
  const [follows, setFollow] = useState(initialFollows);
  const [isFollowed, setIsFollowed] = useState(false);

  const toggleFollow = () => {
    setFollow((prevFollows) => (isFollowed ? prevFollows - 1 : prevFollows + 1));
    setIsFollowed(!isFollowed);
  };

  return {
    follows,
    isFollowed,
    toggleFollow,
  };
};

export default useFollow;
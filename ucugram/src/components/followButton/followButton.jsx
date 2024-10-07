import React from "react";
import useFollow from "ucugram/src/hooks/useFollow.jsx";

const FollowButton = ({ userId, initialFollows }) => {
  const { follows, isFollowed, toggleFollow } = useFollow(initialFollows, userId);

  return (
    <div>
      <button className={`button ${isFollowed ? "is-light" : "is-primary"}`} 
      onClick={toggleFollow}>
        {isFollowed ? "Siguiendo" : "Seguir"} 
        {/* {follows} */}
      </button>
    </div>
  );
};

export default FollowButton;
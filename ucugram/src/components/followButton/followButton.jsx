import React, { useState } from "react";
import useFollow from "ucugram/src/hooks/useFollow.jsx";
import useFriend from "./../../hooks/useFriends.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const FollowButton = ({ userId }) => {
  const { state: authState } = useAuth();
  const [isFriend, setIsFriend] = useState();
  const { addFriend, removeFriend } = useFriend();

  const handleToggleFirend = async () => {
    if (isFriend) {
      const removed = await removeFriend(userId);
      if (removed === true) {
        setIsFriend(false);
      } else {
        // no cambia
        setIsFriend(true);
      }
    } else {
      const added = await addFriend(userId);
      if (added === true) {
        setIsFriend(true);
      } else {
        // no cambia
        setIsFriend(false);
      }
    }
  };

  return (
    <div>
      <button
        className={`button ${isFriend ? "is-light" : "is-primary"}`}
        onClick={handleToggleFirend}
      >
        {isFriend ? "remove friend" : "add friend"}
      </button>
    </div>
  );
};

export default FollowButton;

import { useState, useEffect } from "react";
import { url } from "./../App.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const useLike = (post) => {
  const { state: authState } = useAuth();
  const [likes, setLikes] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    const find = post.likes.find((id) => id === authState.user?._id);
    setIsLiked(find !== undefined);
  }, [authState.user?._id, post.likes]);

  const getLikes = async (action) => {
    try {
      // console.log("action " + action);
      const response = await fetch(url + `posts/${post._id}/like`, {
        method: action,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // console.log("data: ", data);
        if (data && data.likes) {
          setLikes(data.likes.length);
          const find = data.likes.find((id) => id === authState.user?._id);
          setIsLiked(find !== undefined);
        } else {
          setIsLiked(false);
        }
      }
      return data;
    } catch (err) {
      console.error("Error in getLikes:", err);
      return err;
    }
  };

  const toggleLike = async () => {
    if (isLiked) {
      await getLikes("DELETE");
    } else {
      await getLikes("POST");
    }
  };

  useEffect(() => {
    // console.log("isLiked: " + isLiked);
  }, [isLiked]);

  return {
    likes,
    isLiked,
    toggleLike,
  };
};

export default useLike;

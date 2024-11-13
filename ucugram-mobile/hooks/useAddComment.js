import { useState } from "react";
import { url } from "../App.js";
import { useAuth } from "../context/AuthContext.js";

// const url = "http://localhost:3000/posts";

const useAddComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state: authState } = useAuth();

  const addComment = async (content, postId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url + `posts/${postId}/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify(content),
      });

      const data = await response.json();
      setLoading(false);
      console.log("post result: ", data);
      return data;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return { addComment, loading, error };
};

export default useAddComment;

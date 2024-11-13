import { useEffect, useState } from "react";
import { url } from "../App.js";
import { useAuth } from "../context/AuthContext.js";

// const url = 'http://localhost:3000/posts';

const useFetchPosts = () => {
  const { state: authState } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(url + "posts/feed", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
      });
      const data = await response.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default useFetchPosts;

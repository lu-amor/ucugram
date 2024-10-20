import { useState, useEffect } from 'react';

const url = 'http://localhost:3000/posts';

const useFetchPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(url, { method: "GET" });
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


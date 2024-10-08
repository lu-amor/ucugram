import { useState } from 'react';

const url = 'http://localhost:3000/posts';

const UseAddComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchPostById = async (postId) => {
    try {
      const response = await fetch(`${url}/${postId}`);
      if (!response.ok) {
        throw new Error(`Error fetching post with id ${postId}`);
      }
      return await response.json();
    } catch (err) {
      throw err;
    }
  };

  const updatePostComments = async (postId, updatedComments) => {
    try {
      const response = await fetch(`${url}/${postId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments: updatedComments }),
      });

      if (!response.ok) {
        throw new Error('Error updating comments');
      }
      return await response.json();
    } catch (err) {
      throw err;
    }
  };

  const addComment = async (postId, newComment) => {
    setLoading(true);
    setError(null);  
    try {
      const post = await fetchPostById(postId);  
      const updatedComments = [...post.comments, newComment];  

      await updatePostComments(postId, updatedComments);  
      setLoading(false);
    } catch (err) {
      setError(err);  
      setLoading(false);
    }
  };

  return { addComment, loading, error };
};

export default UseAddComment;

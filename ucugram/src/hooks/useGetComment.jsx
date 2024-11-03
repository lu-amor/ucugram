import { useState, useEffect } from 'react';
import { url } from './../App.jsx';
import { useAuth } from '../context/AuthContext.jsx';

// const url = 'http://localhost:3000/posts';

const useGetComment = () => {
  const { state: authState } = useAuth();

  const getComment = async (commentId) => {
    try {
      const response = await fetch(url + "posts/comments/" + commentId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authState.token}`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  };

  return getComment;
};

export default useGetComment;


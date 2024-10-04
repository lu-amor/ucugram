import React, { useState } from 'react';
import 'ucugram/src/components/postActions/postActions.css';

const PostActions = () => {
  const [likes, setLikes] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);  
  };

  return (
    <div className="post-actions">
      <button onClick={handleLike}>Like {likes}</button>
      <button>Comment</button>
      <button>Share</button>
    </div>
  );
};

export default PostActions;

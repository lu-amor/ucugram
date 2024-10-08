import { useState } from 'react';

const useComment = () => {
  const [isCommentVisible, setIsCommentVisible] = useState(false);

  const toggleCommentVisibility = () => {
    setIsCommentVisible(prevState => !prevState);
  };

  const hideComment = () => {
    setIsCommentVisible(false);
  };

  return {
    isCommentVisible,
    toggleCommentVisibility,
    hideComment,
  };
};

export default useComment;

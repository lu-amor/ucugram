import React from 'react';
import Icon from '@mdi/react';
import { mdiComment } from '@mdi/js';

const CommentButton = ({ toggleCommentVisibility }) => {

  return (
    <>
      <button className="comment-button" onClick={toggleCommentVisibility}>
        <Icon path={mdiComment} size={1.3} className='mt-2' />
      </button> 
    </>
  );
};

export default CommentButton;
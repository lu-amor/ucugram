import React, { useEffect, useState, useRef } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import Avatar from 'ucugram/src/components/avatar/avatar.jsx';
import PostModal from "../postModal/postModal";
import Icon from '@mdi/react';
import { mdiShareVariant, mdiComment } from '@mdi/js';
import useComment from 'ucugram/src/hooks/useComment';
import CommentInput from 'ucugram/src/components/commentInput/commentInput.jsx';
import classes from './postContainer.module.css';

const PostContainer = ({ post }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isCommentVisible, toggleCommentVisibility, hideComment } = useComment();
    const likeButtonRef = useRef(null); 

    const handleDoubleClick = () => {
        if (likeButtonRef.current !== null) {
            likeButtonRef.current.click(); // simulo el click en el botón de like
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`${classes.individualPostContainer}`}>
            <div className={`${classes.postContainerHeader}`}>
                <Avatar className={`${classes.userAvatar}`} user={post.user}></Avatar>
                <h3 className={`${classes.postUsername}`}><strong className="has-text-info has-text-weight-bold">{post.user}</strong></h3>
                <p className={`${classes.postDateInfo}`}>{post.date}</p>
            </div>

            <div className="columns is-centered m-0">
                <div className="column is-half p-0">
                    <figure className="image is-square" onDoubleClick={handleDoubleClick}>
                        <img src={post.imageUrl} alt={post.description} />
                    </figure>
                </div>

                <div className="column is-half p-0">
                    <div className={`${classes.dataBox}`}>
                        <div className="buttons mt-1">
                            <LikeButton className={`${classes.likeSection}`} ref={likeButtonRef} postId={post.id} initialLikes={post.likes} modal={false} />
                            <Icon path={mdiComment} size={1.6} onClick={toggleCommentVisibility} className='ml-auto' color='#ea5b0c'/>
                            <Icon path={mdiShareVariant} size={1.7} color='#ea5b0c'/>
                        </div>
                        {isCommentVisible && (
                            <div className={`${classes.commentInputSection} mb-4`}>
                            <CommentInput postId={post.id} handleCommentPublished={hideComment} />
                            </div>
                        )}
                        <p className={`${classes.pictureDescription} mt-3`}><strong className="has-text-info">{post.user}</strong> {post.description}</p>
                        <ul className={`${classes.commentsBox} mt-4`}>
                            {post.comments.map((comment) => (
                                <li key={comment.id} className="mb-2">
                                    <p><strong className="has-text-info">{comment.user}</strong> {comment.text} </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className={classes.divider}/>

            <PostModal post={post} isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
    );
};

export default PostContainer;
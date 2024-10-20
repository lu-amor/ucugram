import React, { useState } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import Avatar from 'ucugram/src/components/avatar/avatar.jsx';
import PostModal from "../postModal/postModal";
import Icon from '@mdi/react';
import { mdiShare, mdiComment } from '@mdi/js';
import useComment from 'ucugram/src/hooks/useComment';
import CommentInput from 'ucugram/src/components/commentInput/commentInput.jsx';
import './postContainer.css';

const PostContainer = ({ post }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isCommentVisible, toggleCommentVisibility, hideComment } = useComment();

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="individual-post-container">
            <div className="post-container-header">
                <Avatar className="user-avatar" user={post.user}></Avatar>
                <h3 className="post-username"><strong className="has-text-white">{post.user}</strong></h3>
                <p className="post-date-info">{post.date}</p>
            </div>

            <div className="columns is-centered m-0">
                <div className="column is-half p-0">
                    <figure className="image is-square">
                        <img src={post.imageUrl} alt={post.description} />
                    </figure>
                </div>

                <div className="column is-half p-0">
                    <div className="data-box">
                        <div className="buttons mt-1">
                            <LikeButton className="like-section" postId={post.id} initialLikes={post.likes} modal={false} />
                            <Icon path={mdiComment} size={1.6} onClick={toggleCommentVisibility} className='ml-auto' color='#ea5b0c'/>
                            <Icon path={mdiShare} size={2} color='#ea5b0c'/>
                        </div>
                        {isCommentVisible && (
                            <div className="comment-input-section mb-4">
                            <CommentInput postId={post.id} handleCommentPublished={hideComment} />
                            </div>
                        )}
                        <p className="picture-description mt-3"><strong className="has-text-white">{post.user}</strong> {post.description}</p>
                        <ul className="comments-box mt-4">
                            {post.comments.map((comment) => (
                                <li key={comment.id} className="mb-2">
                                    <p><strong className="has-text-white">{comment.user}</strong> {comment.text} </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <PostModal post={post} isOpen={isModalOpen} onClose={handleModalClose} />
        </div>
    );
};

export default PostContainer;
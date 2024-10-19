import React,  { useState } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import Avatar from 'ucugram/src/components/avatar/avatar.jsx'
import PostModal from "../postModal/postModal";
import CommentInput from "../commentInput/commentInput";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faComment, faShare } from '@fortawesome/free-solid-svg-icons';
import './postContainer.css';


const PostContainer = ({post}) => {

 const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

    return (
        <>
            <div className="post-container-header is-flex ">

                <div className="user-info-header is-flex is-justify-content-space-between">
                  <Avatar className="user-avatar" user={post.user} ></Avatar>
                  <h3 className="post-username ml-2" ><strong>{post.user}</strong></h3>
                  <p className="post-date-info">{post.date}</p>
                </div>
            </div>

            <figure className="picture">
                <img src={post.imageUrl} alt={post.description} className="is-centered" />
            </figure>

            <div className="data-box p-4">
                <div className="buttons is-centered mt-4">

                    <LikeButton className="like-section" postId={post.id} initialLikes={post.likes} />

                    <FontAwesomeIcon className="share-button ml-3" icon={faShare}/>

                    <button  onClick={handleModalOpen}>
                        <FontAwesomeIcon className="comment-button ml-3" icon={faComment} />
                    </button>


                </div> 

                <p className="picture-description mt-3"><strong>{post.user}</strong> {post.description}</p>

                <ul className="comments-box mt-4">
                    {post.comments.map((comment) => (
                    <li key={comment.id} className="mb-2">
                    <p><strong>{comment.user}</strong> {comment.text} </p>
                    </li>
                    ))}
                </ul>

            </div>

            <PostModal post={post} isOpen={isModalOpen} onClose={handleModalClose} />
        </>

    );
};

export default PostContainer;
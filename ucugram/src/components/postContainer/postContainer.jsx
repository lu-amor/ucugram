import React, { useEffect, useState, useRef } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import Avatar from "ucugram/src/components/avatar/avatar.jsx";
import Icon from "@mdi/react";
import { mdiShare, mdiComment } from "@mdi/js";
import useComment from "ucugram/src/hooks/useComment";
import CommentInput from "ucugram/src/components/commentInput/commentInput.jsx";
import "./postContainer.css";
import useGetComment from "./../../hooks/useGetComment.jsx";
import { useGetProfile } from "../../hooks/useGetProfile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const PostContainer = ({ post }) => {
  const [isCommentVisible, setIsCommentVisible] = useState();
  const likeButtonRef = useRef(null);
  const [comments, setComments] = useState([]);
  const getComment = useGetComment();
  const navigate = useNavigate();
  const {state: authState} = useAuth();
  const getProfile = useGetProfile();

  const handleDoubleClick = () => {
    if (likeButtonRef.current !== null) {
      likeButtonRef.current.click(); // simulo el click en el botón de like
    }
  };

  useEffect(() => {
    const loadComments = async () => {
      const loadedComments = await Promise.all(
        post.comments.map(async (commentId) => {
          const commentInfo = await getComment(commentId);
          return { commentInfo };
        })
      );
      setComments(loadedComments);
    };

    loadComments();
  }, [post.comments]);

  const handleCommentPublished = async (data) => {
    setIsCommentVisible(false);
    const commentInfo = await getComment(data._id);
    setComments((prevComments) => [...prevComments, { commentInfo }]);
  };

  const handleGoProfile = async (username, userId) => {
    if (username !== authState.user.username) {
      await getProfile(userId)
      navigate(`/friendProfile/${username}`)
    } else {
      navigate("/myProfile")
    }
  }

  return (
    <div className="individual-post-container">
      <div className="post-container-header">
        <div style={{ width: "30px", height: "30px", marginLeft: "5px" }}>
          <Avatar className="user-avatar" user={post.user}></Avatar>
        </div>
        <h3 className="post-username">
          <button onClick={() => handleGoProfile(post.user.username, post.user._id)}>
            <strong className="has-text-white">{post.user.username}</strong>
          </button>
        </h3>
        <p className="post-date-info">{post.createdAt.split("T")[0]}</p>
      </div>

      <div className="columns is-centered m-0">
        <div className="column is-half p-0">
          <figure className="image is-square" onDoubleClick={handleDoubleClick}>
            <img
              src={"http://localhost:3001/" + post.imageUrl}
              alt={post.caption}
            />
          </figure>
        </div>

        <div className="column is-half p-0">
          <div className="data-box">
            <div className="buttons mt-1">
              <LikeButton
                className="like-section"
                ref={likeButtonRef}
                post={post}
                initialLikes={post.likes.length}
                modal={false}
              />
              <Icon
                path={mdiComment}
                size={1.6}
                onClick={() => setIsCommentVisible(!isCommentVisible)}
                className="ml-auto"
                color="#ea5b0c"
              />
              <Icon path={mdiShare} size={2} color="#ea5b0c" />
            </div>
            {isCommentVisible && (
              <div className="comment-input-section mb-4">
                <CommentInput
                  postId={post._id}
                  handleCommentPublished={handleCommentPublished}
                />
              </div>
            )}
            <p className="picture-description mt-3">
              <strong className="has-text-white">{post.user.username}</strong>{" "}
              {post.caption}
            </p>
            <ul className="comments-box mt-4">
              {comments.map((comment) => {
                const info = comment.commentInfo;
                return (
                  <li key={info._id} className="mb-2">
                    <p>
                      <strong className="has-text-white">
                        {info.user.username}
                      </strong>{" "}
                      {info.content}{" "}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;

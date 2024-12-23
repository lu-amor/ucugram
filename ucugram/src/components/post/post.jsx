import React, { useEffect, useState, useRef } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import classes from "./Post.module.css";
import Avatar from "ucugram/src/components/avatar/avatar.jsx";
import Icon from "@mdi/react";
import { mdiShare, mdiShareVariant, mdiComment } from "@mdi/js";
import useComment from "ucugram/src/hooks/useComment";
import CommentInput from "ucugram/src/components/commentInput/commentInput.jsx";
import useGetComment from "./../../hooks/useGetComment.jsx";
import { useGetProfile } from "../../hooks/useGetProfile";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Toastify from "toastify-js"
import 'toastify-js/src/toastify.css'

const Post = ({ post }) => {
  const [isCommentVisible, setIsCommentVisible] = useState();
  const likeButtonRef = useRef(null);
  const [comments, setComments] = useState([]);
  const getComment = useGetComment();
  const navigate = useNavigate();
  const { state: authState } = useAuth();
  const getProfile = useGetProfile();

  const handleDoubleClick = () => {
    if (likeButtonRef.current !== null) {
      likeButtonRef.current.click(); // simulo el click en el botón de like
    }
  };

  const handleShare = () => {
    Toastify({
      text: "Link copied to clipboard!",
      className: "info",
      style: {
        background: "linear-gradient(135deg, #ea5b0c, #009ce6)",
        width: "220px",
        maxWidth: "220px",
        borderRadius: "8px",
      }
    }).showToast();
  };

  useEffect(() => {
    const loadComments = async () => {
      const loadedComments = await Promise.all(
        post.comments.map(async (comment) => {
          const commentInfo = await getComment(comment._id);
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
      await getProfile(userId);
      navigate(`/profile/${username}`);
    } else {
      navigate("/myProfile");
    }
  };

  return (
    <>
      <div className={classes.postContainer}>
        <header className={classes.header}>
          <div>
            <div>
              <Avatar
                className={`${classes.userAvatar}`}
                user={post.user}
              ></Avatar>
            </div>
            <h3 className={`${classes.postUsername}`}>
              <button
                onClick={() =>
                  handleGoProfile(post.user.username, post.user._id)
                }
              >
                <strong>{post.user.username}</strong>
              </button>
            </h3>
          </div>
          <p className={`${classes.postDateInfo}`}>
            {post.createdAt.split("T")[0]}
          </p>
        </header>

        <div>
          <figure className="image is-square" onDoubleClick={handleDoubleClick}>
            <img
              src={"http://localhost:3001/" + post.imageUrl}
              alt={post.caption}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </figure>
        </div>
        <div className={`${classes.dataBox}`}>
          <div className={classes.buttonsContainer}>
            <LikeButton
              className={`${classes.likeSection}`}
              style={{ cursor: "pointer" }}
              ref={likeButtonRef}
              post={post}
              initialLikes={post.likes.length}
              modal={false}
            />
            <div>
              <Icon
                path={mdiComment}
                size={1.6}
                onClick={() => setIsCommentVisible(!isCommentVisible)}
                className="ml-auto"
                color="#ea5b0c"
                style={{ cursor: "pointer" }}
              />
              <CopyToClipboard text={"http://localhost:5173/profile/" + post.user.username}>
                <Icon path={mdiShareVariant} size={1.7} color="#ea5b0c" style={{ cursor: "pointer" }} onClick={handleShare}/>
              </CopyToClipboard>
            </div>
          </div>
          <p className={`${classes.pictureDescription} mt-3`}>
            <strong>{post.user.username}</strong> {post.caption}
          </p>
          {isCommentVisible && (
            <>
            <ul className={`${classes.commentsBox} mt-4`}>
              {comments.map((comment) => {
                  const info = comment.commentInfo;
                  return (
                      <li key={info._id} className="mb-2">
                    <p>
                      <strong>{info.user.username}</strong> {info.content}{" "}
                    </p>
                  </li>
                );
            })}
            </ul>
            <div className={`${classes.commentInputSection} mb-4`}>
              <CommentInput
                postId={post._id}
                handleCommentPublished={handleCommentPublished}
              />
            </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Post;

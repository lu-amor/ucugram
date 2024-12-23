import React, { useRef, useState, useEffect } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import CommentButton from "../commentButton/commentButton";
import classes from "./postModal.module.css";
import Icon from "@mdi/react";
import { mdiShareVariant, mdiComment, mdiClose } from "@mdi/js";
import Avatar from "ucugram/src/components/avatar/avatar.jsx";
import useComment from "ucugram/src/hooks/useComment";
import CommentInput from "ucugram/src/components/commentInput/commentInput.jsx";
import useGetComment from "./../../hooks/useGetComment.jsx";
import { useProfile } from "../../context/ProfileContext";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Toastify from "toastify-js"
import 'toastify-js/src/toastify.css'

const PostModal = ({ post, user, onClose }) => {
  const { state: profileState } = useProfile();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isCommentVisible, setIsCommentVisible] = useState();
  const likeButtonRef = useRef(null);
  const [comments, setComments] = useState([]);
  const getComment = useGetComment();

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
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

  const handleDoubleClick = () => {
    if (likeButtonRef.current !== null) {
      likeButtonRef.current.click(); // simulo el click en el botón de like
    }
  };

  return (
    <div className={`modal ${classes.modalStyle} is-active`}>
      <div className={`modal-background`} onClick={onClose}></div>
      <div className={`modal-content ${classes.modalContent}`} onClick={onClose}>
        <>
        <div className={classes.postContainer} onClick={(event) => event.stopPropagation()}>
          <header className={classes.header}>
            <div>
              <div>
                <Avatar
                  className={`${classes.userAvatar}`}
                  user={user}
                ></Avatar>
              </div>
              <h3 className={`${classes.postUsername}`}>
                <button
                  onClick={() =>
                    handleGoProfile(post.user.username, post.user._id)
                  }
                >
                  <strong>{user.username}</strong>
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
          <div className={`${classes.dataBox}`}/>
        </div>
        </>
      </div>
    </div>
  );
};

export default PostModal;

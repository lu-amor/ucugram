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

const PostModal = ({ post, user, onClose }) => {
  const { state: profileState } = useProfile();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isCommentVisible, setIsCommentVisible] = useState();
  const likeButtonRef = useRef(null);
  const [comments, setComments] = useState([]);
  const getComment = useGetComment();

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
      <div className={`modal-content ${classes.modalContent}`}>
        <>
        <div className={classes.postContainer}>
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
                  {console.log(user)}
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
                <Icon path={mdiShareVariant} size={1.7} color="#ea5b0c" style={{ cursor: "pointer" }}/>
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
      </div>
    </div>
  );
};

export default PostModal;

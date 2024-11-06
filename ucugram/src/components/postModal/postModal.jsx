import React, { useRef, useState, useEffect } from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";
import CommentButton from "../commentButton/commentButton";
import classes from "./postModal.module.css";
import Icon from "@mdi/react";
import { mdiShareVariant } from "@mdi/js";
import Avatar from "ucugram/src/components/avatar/avatar.jsx";
import useComment from "ucugram/src/hooks/useComment";
import CommentInput from "ucugram/src/components/commentInput/commentInput.jsx";
import useGetComment from "./../../hooks/useGetComment.jsx";
import { useProfile } from "../../context/ProfileContext";

const PostModal = ({ post, onClose }) => {
  const { state: profileState } = useProfile();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isCommentVisible, setIsCommentVisible] = useState();
  const likeButtonRef = useRef(null);
  const user = profileState.user;
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
      <button
        className={`${classes.modalClose} is-large has-text-white`}
        aria-label="close"
        onClick={onClose}
      ></button>
      <div className={`modal-content ${classes.modalContent}`}>
        <div className={`${classes.modalCardBody} p-0`}>
          <figure className="image is-square" onDoubleClick={handleDoubleClick}>
            <img
              src={"http://localhost:3001/" + post.imageUrl}
              alt={post.description}
            />
          </figure>
          {windowWidth > 950 ? (
            <div className={`${classes.dataContainer} p-4`}>
              <div className={`${classes.postText}`}>
                <div
                  className={`${classes.postHeader} is-flex is-justify-content-space-between`}
                >
                  <div
                    className={`${classes.userInfo} is-flex is-align-items-center`}
                  >
                    {/* style={{ width: "25px", height: "25px" }} */}

                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "5px",
                      }}
                    >
                      <Avatar
                        className={`${classes.userAvatar}`}
                        user={user}
                      ></Avatar>
                    </div>
                    <h3 className="ml-2">
                      <strong className="has-text-white">
                        {user.username}
                      </strong>
                    </h3>
                  </div>
                  <p className={`${classes.postDate}`}>
                    {post.createdAt.split("T")[0]}
                  </p>
                </div>
                <p className={`${classes.picDescription} mt-3`}>
                  <strong className="has-text-white mr-1 has-text-weight-bold">
                    {user.username}
                  </strong>{" "}
                  {post.description}
                </p>

                <ul className={`${classes.commentsSection} mt-4`}>
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
              <div className="buttons mb-3 mt-1">
                <LikeButton
                  className={`${classes.likeSection}`}
                  ref={likeButtonRef}
                  post={post}
                  initialLikes={post.likes.length}
                  modal={true}
                />
                <CommentButton
                  className="ml-3"
                  postId={post.id}
                  toggleCommentVisibility={() =>
                    setIsCommentVisible(!isCommentVisible)
                  }
                />
                <Icon
                  path={mdiShareVariant}
                  size={1.4}
                  className="ml-auto mr-4"
                  color="#ea5b0c"
                />
              </div>

              {isCommentVisible && (
                <div className="comment-input-section">
                  <CommentInput
                    postId={post._id}
                    handleCommentPublished={handleCommentPublished}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className={`${classes.dataContainer} p-4`}>
              <div className="buttons mt-1 mb-2">
                <LikeButton
                  className={`${classes.likeSection}`}
                  ref={likeButtonRef}
                  post={post}
                  initialLikes={post.likes.length}
                  modal={true}
                />
                <CommentButton
                  className="ml-3"
                  postId={post.id}
                  toggleCommentVisibility={() =>
                    setIsCommentVisible(!isCommentVisible)
                  }
                />
                <Icon
                  path={mdiShareVariant}
                  size={1.4}
                  className="ml-auto mr-4"
                  color="#ea5b0c"
                />
              </div>
              {isCommentVisible && (
                <div className={`${classes.commentInputSection} mb-4`}>
                  <CommentInput
                    postId={post._id}
                    handleCommentPublished={handleCommentPublished}
                  />
                </div>
              )}
              <div
                className={`${classes.postHeader} is-flex is-justify-content-space-between`}
              >
                <div
                  className={`${classes.userInfo} is-flex is-align-items-center`}
                >
                  <>// style={{ width: "20px", height: "20px" }}</>

                  <Avatar className="user-avatar" user={user}></Avatar>
                  <h3 className="ml-2">
                    <strong className="has-text-white">{user.username}</strong>
                  </h3>
                </div>
                <p className={`${classes.postDate}`}>{post.date}</p>
              </div>
              <p className={`${classes.picDescription} mt-3`}>
                <strong className="has-text-white">{user.username}</strong>{" "}
                {post.description}
              </p>
              <ul className={`${classes.commentsSection} mt-4`}>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default PostModal;

import React from "react";
import LikeButton from "ucugram/src/components/likeButton/likeButton.jsx";

const PostModal = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  return (
    <div className={`modal ${isOpen ? "is-active" : ""}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <figure className="image is-4by3">
            <img src={post.imageUrl} alt={post.description} />
          </figure>
          <p>{post.description}</p>
          <div className="like-section">
            <LikeButton postId={post.id} initialLikes={post.likes} />
          </div>
          <div className="comments-section">
            {/* <h2 className="title is-5">Comentarios:</h2> */}
            <ul>
              {post.comments.map((comment) => (
                <li key={comment.id}>{comment.text}</li>
              ))}
            </ul>
          </div>
        </section>
        {/* <footer className="modal-card-foot">
          <button className="button is-link" onClick={onClose}>Cerrar</button>
        </footer> */}
      </div>
    </div>
  );
};

export default PostModal;

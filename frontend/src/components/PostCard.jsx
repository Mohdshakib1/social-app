import API from "../services/api";
import { useState } from "react";

function PostCard({ post, fetchPosts }) {
  const [comment, setComment] = useState("");

  const likePost = async () => {
    try {
      await API.put(`/posts/${post._id}/like`);
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async () => {
    if (!comment) return;

    try {
      await API.post(`/posts/${post._id}/comment`, {
        text: comment,
      });

      setComment("");
      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-card">
      <div className="post-user">
        <div className="avatar">
          {post.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3>{post.username}</h3>
          <p>
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="post-text">
        {post.text}
      </p>

      {/* IMAGE */}
      {post.image && (
        <img
          src={`https://social-app-z0bd.onrender.com${post.image}`}
          alt="Post"
          className="post-image"
        />
      )}

      <div className="post-footer">
        <button onClick={likePost}>
          ❤️ {post.likes?.length || 0}
        </button>

        <button>
          💬 {post.comments?.length || 0}
        </button>
      </div>

      <div className="comment-box">
        <input
          type="text"
          placeholder="Write comment..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <button onClick={addComment}>
          Send
        </button>
      </div>

      {post.comments?.map((c, i) => (
        <div
          key={i}
          className="comment"
        >
          <b>{c.username}</b>: {c.text}
        </div>
      ))}
    </div>
  );
}

export default PostCard;
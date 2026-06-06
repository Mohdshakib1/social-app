import API from "../services/api";
import { useState } from "react";

function PostCard({ post, fetchPosts }) {

  const [comment,setComment]=useState("");

  const likePost=async()=>{

    await API.put(
      `/posts/${post._id}/like`
    );

    fetchPosts();
  };

  const addComment=async()=>{

    if(!comment) return;

    await API.post(
      `/posts/${post._id}/comment`,
      {
        text:comment
      }
    );

    setComment("");

    fetchPosts();
  };

  return (
    <div className="post-card">

      <div className="post-user">

        <div className="avatar">
          {post.username[0]}
        </div>

        <div>
          <h3>{post.username}</h3>
          <p>
            {new Date(
              post.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

      </div>

      <p className="post-text">
        {post.text}
      </p>

      {post.image && (

        <img
          src={`http://localhost:5000${post.image}`}
          className="post-image"
          alt=""
        />

      )}

      <div className="post-footer">

        <button
          onClick={likePost}
        >
          ❤️ {post.likes.length}
        </button>

        <button>
          💬 {post.comments.length}
        </button>

      </div>

      <div className="comment-box">

        <input
          placeholder="Write comment..."
          value={comment}
          onChange={(e)=>
            setComment(
              e.target.value
            )
          }
        />

        <button
          onClick={addComment}
        >
          Send
        </button>

      </div>

      {post.comments.map((c,i)=>(

        <div
          key={i}
          className="comment"
        >
          <b>{c.username}</b> :
          {c.text}
        </div>

      ))}

    </div>
  );
}

export default PostCard;
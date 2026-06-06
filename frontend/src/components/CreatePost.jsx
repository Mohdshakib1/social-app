import { useState } from "react";
import API from "../services/api";

function CreatePost({ fetchPosts }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const submitPost = async () => {
    try {
      if (!text && !image) {
        alert("Please enter text or select image");
        return;
      }

      const formData = new FormData();

      formData.append("text", text);

      if (image) {
        formData.append("image", image);
      }

      await API.post("/posts", formData);

      setText("");
      setImage(null);

      fetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-post-card">
      <div className="post-header">
        <h2>Create Post</h2>
      </div>

      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="preview"
          className="preview-image"
        />
      )}

      <div className="post-actions">
        <label>
          📷
          <input
            type="file"
            hidden
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />
        </label>

        <span>😊</span>

        <span>📢 Promote</span>

        <button onClick={submitPost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
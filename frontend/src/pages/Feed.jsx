import { useEffect, useState } from "react";
import API from "../services/api";

import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await API.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="feed">
      <h1>Social Feed</h1>

      <CreatePost fetchPosts={fetchPosts} />

      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          fetchPosts={fetchPosts}
        />
      ))}
    </div>
  );
}

export default Feed;
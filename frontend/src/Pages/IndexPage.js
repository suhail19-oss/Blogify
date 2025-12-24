import Post from "../post";
import { useState, useEffect } from "react";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/post")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading posts...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        No posts available
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {posts.map((post) => (
        <Post key={post._id} {...post} />
      ))}
    </div>
  );
}

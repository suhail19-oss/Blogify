import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  async function createNewPost(e) {
    e.preventDefault();
    setLoading(true);

    if (!title || !summary || !content) {
      toast.error("Title, summary, and content are required");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files && files.length > 0) {
      data.set("file", files[0]);
    }

    try {
      const res = await fetch("http://localhost:4000/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Failed to create post");
      } else {
        toast.success("Post created successfully");
        setTimeout(() => setRedirect(true), 600);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (redirect) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex justify-center px-4 bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.04),_transparent_60%)]">
      <form
        onSubmit={createNewPost}
        className="w-full max-w-3xl bg-white rounded-2xl p-8 space-y-6 border border-gray-200 shadow-lg"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create New Post</h1>
          <p className="text-gray-500 mt-1">
            Share your thoughts with the world
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            required
            className="w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Summary</label>
          <input
            type="text"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Short summary"
            required
            className="w-full px-4 py-2.5 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFiles(e.target.files)}
            className="block w-full text-sm text-gray-600
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-lg file:border-0
                       file:bg-blue-50 file:text-blue-600
                       hover:file:bg-blue-100"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Content</label>
          <Editor value={content} onChange={setContent} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-lg font-semibold text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
          }`}
        >
          {loading ? "Publishing..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}

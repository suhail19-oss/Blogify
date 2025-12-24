import { format } from "date-fns";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const { userInfo } = useContext(UserContext);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`)
      .then((res) => res.json())
      .then((data) => setPostInfo(data));
  }, [id]);

  if (!postInfo) {
    return (
      <div className="flex justify-center py-20 text-gray-500">
        Loading post...
      </div>
    );
  }

  const { title, cover, content, createdAt, author } = postInfo;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(0,0,0,0.04),_transparent_60%)] px-4">
      <article className="max-w-4xl mx-auto py-16 space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
            {title}
          </h1>

          <div className="flex justify-center items-center gap-3 text-sm text-gray-500">
            <span className="font-medium text-gray-700">
              {author?.username}
            </span>
            <span>•</span>
            <time>{format(new Date(createdAt), "MMM d, yyyy · HH:mm")}</time>
          </div>
        </header>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <img
            src={`http://localhost:4000/${cover}`}
            alt={title}
            className="w-full max-h-[420px] object-cover"
          />
        </div>

        <div
          className="prose prose-lg max-w-none prose-gray"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {userInfo?.id === author?._id && (
          <div className="flex justify-center pt-8">
            <Link
              to={`/edit/${postInfo._id}`}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Edit Post
            </Link>
          </div>
        )}
      </article>
    </div>
  );
}

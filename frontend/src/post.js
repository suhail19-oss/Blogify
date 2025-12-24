import { format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({
  title,
  summary,
  cover,
  createdAt,
  author,
  _id,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition">
      <Link to={`/post/${_id}`} className="block overflow-hidden">
        <img
          src={`http://localhost:4000/${cover}`}
          alt={title}
          className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-6 space-y-3">
        <Link to={`/post/${_id}`}>
          <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition">
            {title}
          </h2>
        </Link>

        <div className="flex items-center gap-3 text-sm text-gray-500">
          <span className="font-medium text-gray-700">
            {author ? author.username : "Unknown Author"}
          </span>
          <span>•</span>
          <time>{format(new Date(createdAt), "MMM d, yyyy · HH:mm")}</time>
        </div>

        <p className="text-gray-600 leading-relaxed line-clamp-3">{summary}</p>

        <Link
          to={`/post/${_id}`}
          className="inline-block text-sm font-semibold text-blue-600 hover:underline"
        >
          Read more →
        </Link>
      </div>
    </div>
  );
}

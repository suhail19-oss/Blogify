import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost:4000/profile", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUserInfo(data))
      .catch(() => {});
  }, [setUserInfo]);

  const handleLogout = async () => {
    await fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
    toast.success("Logged out");
    navigate("/login");
  };

  const formatUsername = (name) =>
    name ? name.charAt(0).toUpperCase() + name.slice(1) : "";

  return (
    <header className="w-full bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-gray-900">
          Blogify
        </Link>

        <div className="flex items-center gap-6">
          {userInfo ? (
            <>
              <span className="text-sm font-semibold text-gray-800">
                Hi, {formatUsername(userInfo.username)}
              </span>

              <Link
                to="/create"
                className="font-medium text-gray-700 hover:text-blue-600 hover:underline underline-offset-4"
              >
                Create Your Post
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`font-medium ${
                  location.pathname === "/login"
                    ? "text-blue-600 underline underline-offset-4"
                    : "text-gray-700 hover:text-blue-600 hover:underline underline-offset-4"
                }`}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

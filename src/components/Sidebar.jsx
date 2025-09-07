import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="w-64 bg-indigo-700 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-6">Manmitra</h1>
      <div className="mb-4">
        <div className="text-sm">Hi, {user.name || "User"}</div>
        <div className="text-xs opacity-80">{user.email || ""}</div>
      </div>
      <nav className="space-y-3 flex-1">
        <Link to="/dashboard" className="block p-2 rounded hover:bg-indigo-600">Mood Tracker</Link>
        <Link to="/diary" className="block p-2 rounded hover:bg-indigo-600">Diary</Link>
        <Link to="/therapists" className="block p-2 rounded hover:bg-indigo-600">Therapists</Link>
      </nav>
      <button onClick={logout} className="mt-4 bg-indigo-900 py-2 rounded">Logout</button>
    </aside>
  );
}

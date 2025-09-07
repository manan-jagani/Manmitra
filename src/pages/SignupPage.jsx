import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "demo-token");
    localStorage.setItem("user", JSON.stringify({ name, email }));
    navigate("/dashboard");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-indigo-400 to-purple-500 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
          <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Sign up</button>
        </form>
        <p className="mt-4 text-center">Already have an account? <Link to="/" className="text-indigo-600">Login</Link></p>
      </div>
    </div>
  );
}

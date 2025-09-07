// src/pages/Login.jsx
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in with: ${email}`);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-beige-50 to-sage-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-sage-700 mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sage-800 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-sage-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sage-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-sage-800 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-sage-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-sage-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sage-600 hover:bg-sage-700 text-white py-2 rounded-lg font-medium"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="#" className="text-sage-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

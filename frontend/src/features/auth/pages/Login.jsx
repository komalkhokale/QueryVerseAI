import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../hook/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  // Agar already login hai to dashboard par bhejo
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    await handleLogin({
      email,
      password,
    });

    // Redux update hone ke baad navigate
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0F0F10] px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#18181B] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back 👋</h1>

          <p className="mt-2 text-zinc-400">Sign in to continue</p>
        </div>

        {error && (
          <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={submitForm} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-zinc-300">Email</label>

            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="h-12 w-full rounded-lg border border-zinc-700 bg-transparent px-4 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Password</label>

            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="h-12 w-full rounded-lg border border-zinc-700 bg-transparent px-4 text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-12 w-full rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

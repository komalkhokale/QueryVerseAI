import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const user = useSelector(state => state.auth.user)

  const user = useSelector((state) => state.auth.user);

  const loading = useSelector(state => state.auth.loading)

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  if(!loading && user){
    return <Navigate to="/" replace />;  
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const payload = {
      email,
      password,
    };

    await handleLogin(payload);
    navigate("/dashboard");
  };


  return (
    <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#18181B] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome Back 👋</h1>

          <p className="text-zinc-400 mt-2">Sign in to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={submitForm} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg bg-transparent border border-zinc-700 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg bg-transparent border border-zinc-700 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition duration-300 font-semibold text-white"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
       
        {/* Register */}
        <p className="text-center text-zinc-400 mt-8">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

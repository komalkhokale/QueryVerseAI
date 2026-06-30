import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-[#0F0F10] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#18181B] border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create Account 🚀</h1>

          <p className="text-zinc-400 mt-2">Join us and start your journey</p>
        </div>

        {/* Form */}
        <form onSubmit={submitForm} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-lg bg-transparent border border-zinc-700 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-lg bg-transparent border border-zinc-700 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-zinc-300 mb-2">Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full h-12 px-4 rounded-lg bg-transparent border border-zinc-700 text-white placeholder:text-zinc-500 outline-none transition-all duration-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full h-12 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition duration-300 font-semibold text-white"
          >
            Create Account
          </button>
        </form>
        
        {/* Login */}
        <p className="text-center text-zinc-400 mt-8">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-400 hover:text-cyan-300 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

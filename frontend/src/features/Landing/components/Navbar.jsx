import { Link, useNavigate } from "react-router-dom";
import { Menu, User, LayoutDashboard, LogOut } from "lucide-react";
import { motion } from "framer-motion";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../auth/hook/useAuth"

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);

 const auth = useAuth();
 const navigate = useNavigate();

  const [open, setOpen] = useState(false);

 const handleLogout = async () => {
   await auth.handleLogout();
   navigate("/", { replace: true });
 };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight text-white">
            QueryVerse<span className="text-violet-500">AI</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition"
            >
              Features
            </a>

            <a
              href="#how"
              className="text-gray-300 hover:text-white transition"
            >
              How it Works
            </a>

            <a
              href="#pricing"
              className="text-gray-300 hover:text-white transition"
            >
              Pricing
            </a>

            <a
              href="#contact"
              className="text-gray-300 hover:text-white transition"
            >
              Contact
            </a>
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-xl text-white hover:bg-white/10 transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition text-white"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold"
                >
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#18181B] p-2 shadow-xl">
                    <button
                      onClick={() => navigate("/dashboard")}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-white hover:bg-white/5"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>

                    <button
                      onClick={handleLogout}
                      className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-white">
            <Menu size={28} />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

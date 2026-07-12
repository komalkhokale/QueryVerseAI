import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { useAuth } from "../../auth/hook/useAuth";

const navItems = [
  {
    label: "Features",
    id: "features",
  },
  {
    label: "How It Works",
    id: "how-it-works",
  },
  {
    label: "Pricing",
    id: "pricing",
  },
  {
    label: "Contact",
    id: "contact",
  },
];

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);

  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setMobileOpen(false);
    setProfileOpen(false);

    const scroll = () => {
      const section = document.getElementById(sectionId);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    if (location.pathname === "/") {
      scroll();
      return;
    }

    navigate(`/#${sectionId}`);

    setTimeout(() => {
      scroll();
    }, 150);
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    setProfileOpen(false);

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const logoutUser = async () => {
    const loadingToast = toast.loading("Logging out...");

    try {
      await handleLogout();

      toast.success("Logged out successfully", {
        id: loadingToast,
      });

      setProfileOpen(false);
      setMobileOpen(false);

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message || error?.message || "Logout failed";

      toast.error(message, {
        id: loadingToast,
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
      className="fixed left-0 top-0 z-50 w-full"
    >
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-[#18181B]/80 px-5 py-4 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-6">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className="text-xl font-bold tracking-tight text-white sm:text-2xl"
          >
            QueryVerse
            <span className="text-violet-500">AI</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-gray-300 transition hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop right section */}
          <div className="hidden items-center gap-3 md:flex">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="rounded-xl px-5 py-2 text-sm text-white transition hover:bg-white/10"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-violet-600/20 transition hover:scale-[1.02]"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileOpen((previous) => !previous)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white shadow-lg shadow-violet-600/20"
                  aria-label="Open profile menu"
                >
                  {user?.username?.charAt(0)?.toUpperCase() || "U"}
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.96,
                      }}
                      transition={{
                        duration: 0.18,
                      }}
                      className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#18181B] p-2 shadow-2xl shadow-black/40"
                    >
                      <div className="border-b border-white/10 px-4 py-3">
                        <p className="text-sm font-medium text-white">
                          {user?.username || "User"}
                        </p>

                        <p className="mt-1 truncate text-xs text-zinc-500">
                          {user?.email}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/dashboard");
                        }}
                        className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white transition hover:bg-white/5"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </button>

                      <button
                        type="button"
                        onClick={logoutUser}
                        className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen((previous) => !previous)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white transition hover:bg-white/10 md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={25} />}
          </button>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -12,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -12,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute left-0 right-0 top-[calc(100%+12px)] rounded-2xl border border-white/10 bg-[#18181B] p-3 shadow-2xl shadow-black/40 md:hidden"
              >
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className="block w-full rounded-xl px-4 py-3 text-left text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="my-3 h-px bg-white/10" />

                {!user ? (
                  <div className="grid gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm text-white transition hover:bg-white/5"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3 text-center text-sm font-medium text-white"
                    >
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium text-white">
                        {user?.username || "User"}
                      </p>

                      <p className="mt-1 truncate text-xs text-zinc-500">
                        {user?.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/dashboard");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-white transition hover:bg-white/5"
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </button>

                    <button
                      type="button"
                      onClick={logoutUser}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}

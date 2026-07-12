import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AlertCircle,
  Eye,
  EyeOff,
  LoaderCircle,
  Rocket,
  UserPlus,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../hook/useAuth";

const initialForm = {
  username: "",
  email: "",
  password: "",
};

const initialErrors = {
  username: "",
  email: "",
  password: "",
  general: "",
};

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [showPassword, setShowPassword] = useState(false);

  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);


  const validateField = (name, value) => {
    const trimmedValue = value.trim();

    if (name === "username") {
      if (!trimmedValue) {
        return "Please enter your username";
      }

      if (trimmedValue.length < 3) {
        return "Username must be at least 3 characters";
      }

      if (!/^[a-zA-Z0-9._]+$/.test(trimmedValue)) {
        return "Username can only contain letters, numbers, dots and underscores";
      }

      return "";
    }

    if (name === "email") {
      if (!trimmedValue) {
        return "Please enter your email address";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(trimmedValue)) {
        return "Please enter a valid email address";
      }

      return "";
    }

    if (name === "password") {
      if (!value) {
        return "Please create a password";
      }

      if (value.length < 6) {
        return "Password must be at least 6 characters";
      }

      return "";
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {
      username: validateField("username", form.username),
      email: validateField("email", form.email),
      password: validateField("password", form.password),
      general: "",
    };

    setErrors(newErrors);

    return !newErrors.username && !newErrors.email && !newErrors.password;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
      general: "",
    }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setErrors((previous) => ({
      ...previous,
      [name]: validateField(name, value),
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const loadingToast = toast.loading("Creating your account...");

    try {
      const response = await handleRegister({
        username: form.username.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      toast.success(response?.message || "Account created successfully", {
        id: loadingToast,
      });

      setForm(initialForm);
      setErrors(initialErrors);

     navigate("/login", {
       replace: true,
       state: {
         message: "Account created. Please check your email and then login.",
         email: form.email.trim().toLowerCase(),
       },
     });
    } catch (error) {
      toast.dismiss(loadingToast);

      const responseData = error?.response?.data;

      console.log("Register error:", responseData || error);


      if (
        Array.isArray(responseData?.errors) &&
        responseData.errors.length > 0
      ) {
        const backendErrors = {
          username: "",
          email: "",
          password: "",
          general: "",
        };

        responseData.errors.forEach((item) => {
          const fieldName = item?.path || item?.param;
          const errorMessage = item?.msg || "Invalid value";

          if (
            fieldName === "username" ||
            fieldName === "email" ||
            fieldName === "password"
          ) {
            backendErrors[fieldName] = errorMessage;
          } else {
            backendErrors.general = errorMessage;
          }
        });

        setErrors((previous) => ({
          ...previous,
          ...backendErrors,
        }));

        return;
      }

      const message =
        responseData?.message ||
        error?.message ||
        "Registration failed. Please try again.";

      const lowerMessage = message.toLowerCase();

      if (
        lowerMessage.includes("email") &&
        (lowerMessage.includes("exist") ||
          lowerMessage.includes("registered") ||
          lowerMessage.includes("duplicate") ||
          lowerMessage.includes("used"))
      ) {
        setErrors((previous) => ({
          ...previous,
          email: message,
          general: "",
        }));

        return;
      }

      if (
        lowerMessage.includes("username") &&
        (lowerMessage.includes("exist") ||
          lowerMessage.includes("taken") ||
          lowerMessage.includes("duplicate") ||
          lowerMessage.includes("used") ||
          lowerMessage.includes("contain") ||
          lowerMessage.includes("character"))
      ) {
        setErrors((previous) => ({
          ...previous,
          username: message,
          general: "",
        }));

        return;
      }

      if (
        lowerMessage.includes("password") ||
        lowerMessage.includes("characters")
      ) {
        setErrors((previous) => ({
          ...previous,
          password: message,
          general: "",
        }));

        return;
      }

      setErrors((previous) => ({
        ...previous,
        general: message,
      }));
    }
  };

  const inputClass = (fieldName) => {
    const hasError = Boolean(errors[fieldName]);

    return `
      h-12 w-full rounded-xl border bg-white/[0.035] px-4
      text-sm text-white outline-none transition-all duration-200
      placeholder:text-zinc-600
      ${
        hasError
          ? "border-red-500/80 bg-red-500/[0.04] focus:border-red-400 focus:ring-4 focus:ring-red-500/10"
          : "border-white/10 focus:border-violet-500/50 focus:bg-violet-500/[0.04] focus:ring-4 focus:ring-violet-500/5"
      }
    `;
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#09090B] px-4 py-12 text-white">
      <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[140px]" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-fuchsia-600/15 blur-[140px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/10 text-violet-300">
            <Rocket className="h-6 w-6" />
          </div>

          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-violet-300">
            Get started
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Join QueryVerseAI and start exploring intelligent AI tools.
          </p>
        </div>

        {errors.general && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{errors.general}</span>
          </div>
        )}

        <form onSubmit={submitForm} noValidate className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="username"
              aria-invalid={Boolean(errors.username)}
              aria-describedby={errors.username ? "username-error" : undefined}
              className={inputClass("username")}
            />

            {errors.username && (
              <p
                id="username-error"
                className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-red-400"
              >
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{errors.username}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClass("email")}
            />

            {errors.email && (
              <p
                id="email-error"
                className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-red-400"
              >
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`${inputClass("password")} pr-12`}
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p
                id="password-error"
                className="mt-2 flex items-start gap-1.5 text-xs leading-5 text-red-400"
              >
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:scale-[1.01] hover:shadow-violet-600/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                Create account
              </>
            )}
          </button>
        </form>

        <div className="my-7 flex items-center gap-4">
          <div className="h-px flex-1 bg-white/10" />

          <span className="text-xs uppercase tracking-[0.16em] text-zinc-600">
            Already registered?
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        <p className="text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-violet-400 transition hover:text-violet-300"
          >
            Sign in
          </Link>
        </p>

        <Link
          to="/"
          className="mt-5 block text-center text-xs text-zinc-600 transition hover:text-zinc-400"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
};

export default Register;

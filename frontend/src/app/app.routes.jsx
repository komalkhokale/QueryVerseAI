
import { createBrowserRouter, Navigate } from "react-router-dom";

import LandingPage from "../features/landing/pages/LandingPage";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Dashboard from "../features/chat/pages/Dashboard";
import Protected from "../features/auth/components/Protected";

export const router = createBrowserRouter([
  // Landing Page
  {
    path: "/",
    element: <LandingPage />,
  },

  // Login
  {
    path: "/login",
    element: <Login />,
  },

  // Register
  {
    path: "/register",
    element: <Register />,
  },

  // Protected Dashboard
  {
    path: "/dashboard",
    element: (
      <Protected>
        <Dashboard />
      </Protected>
    ),
  },

  // Invalid Route
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
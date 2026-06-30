// import {createBrowserRouter} from "react-router-dom";
// import Login from "../features/auth/pages/Login";
// import Register from "../features/auth/pages/Register";
// import Dashboard from "../features/chat/pages/Dashboard";
// import Protected from "../features/auth/components/Protected";
// import { Navigate } from "react-router-dom";

// export const router = createBrowserRouter([
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/register",
//     element: <Register />,
//   },
//   {
//     path: "/",
//     element: <Protected>
//       <Dashboard />
//     </Protected>
//   },
//   {
//     path: "/dashboard",
//     element: <Navigate to="/" replace />
//   }
// ]);

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
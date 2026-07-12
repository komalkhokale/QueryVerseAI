import { useDispatch } from "react-redux";

import {
  register,
  login,
  getMe,
  logout as logoutApi,
} from "../service/auth.api";

import {
  setUser,
  setLoading,
  setError,
  logout,
} from "../auth.slice";

export function useAuth() {
  const dispatch = useDispatch();

  async function handleRegister({ email, username, password }) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const data = await register({
        email,
        username,
        password,
      });

      // Register ke baad backend user return karta hai to ye useful hai
      if (data?.user) {
        dispatch(setUser(data.user));
      }

      // Register page ko success message dene ke liye
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

      dispatch(setError(message));

      // Important: page ke catch tak error pahunchana
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const data = await login({
        email,
        password,
      });

      dispatch(setUser(data.user));

      // Login page ko response aur message dene ke liye
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      dispatch(setError(message));

      // Iske bina failed login ke baad bhi navigate ho jayega
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMe() {
    try {
      dispatch(setLoading(true));

      const data = await getMe();

      dispatch(setUser(data.user));

      return data;
    } catch (error) {
      dispatch(setUser(null));

      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogout() {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const data = await logoutApi();

      dispatch(logout());

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Logout failed";

      dispatch(setError(message));

      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
}
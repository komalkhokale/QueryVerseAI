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

      
      if (data?.user) {
        dispatch(setUser(data.user));
      }

      
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";

      dispatch(setError(message));

      
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

   
      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed";

      dispatch(setError(message));

     
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
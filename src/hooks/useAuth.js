import { useState, useCallback } from "react";
import {
  getAccessToken,
  getUserLogged,
  removeAccessToken,
  login as loginAPI,
  putAccessToken,
  register as registerAPI,
} from "@/utils/api";

// Custom hook untuk session autentikasi dan registrasi
export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cek apa sudah ada sesi di local
  const checkSession = useCallback(async () => {
    setIsLoading(true);

    const token = getAccessToken();

    if (token) {
      const { error, data } = await getUserLogged();

      if (!error) {
        setUser(data);
      } else {
        removeAccessToken();
        setUser(null);
      }
    }

    setIsLoading(false);
  }, []);

  // Login dengan api dari api.js
  const login = useCallback(async (email, password) => {
    setError(null);

    try {
      const {
        error: loginError,
        data,
        message,
      } = await loginAPI({ email, password });

      if (loginError) {
        setError(message || "Login failed");
        return;
      }

      // Simpan token ke local storage
      putAccessToken(data.accessToken);

      const { error: userError, data: userData } = await getUserLogged();

      if (userError) {
        setError("Failed to get user data");
        removeAccessToken();
        return;
      }

      setUser(userData);
      setError(null);
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    }
  }, []);

  // Untuk hapus error karena kita simpan error di state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Logout user dan hapus token
  const logout = useCallback(() => {
    setUser(null);
    removeAccessToken();
    setError(null);
  }, []);

  // Register ambil api dari api.js dan error handling di sini
  const register = useCallback(async (name, email, password) => {
    setError(null);
    try {
      const { error: registerError, message } = await registerAPI({
        name,
        email,
        password,
      });
      if (registerError) {
        setError(message || "Registration failed");
        return { success: false };
      }

      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
      return { success: false };
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    checkSession,
    login,
    clearError,
    logout,
    register,
  };
}

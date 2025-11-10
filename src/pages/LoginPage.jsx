import React from "react";
import LoginInput from "@/components/LoginInput";

function LoginPage({ loginSuccess }) {
  const handleLogin = (userData) => {
    if (loginSuccess) {
      loginSuccess(userData);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-zinc-100 via-zinc-600 to-zinc-900">
      <LoginInput onLogin={handleLogin} />
    </div>
  );
}

export default LoginPage;

import React from "react";
import LoginInput from "@/components/LoginInput";

function LoginPage({ login, isLoading }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-zinc-100 via-zinc-600 to-zinc-900">
      <LoginInput login={login} isLoading={isLoading} />
    </div>
  );
}

export default LoginPage;

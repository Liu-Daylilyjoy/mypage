"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/admin",
    });
    setLoading(false);
    if (res?.error) {
      setError("Username or password is incorrect");
    } else if (res?.ok) {
      router.replace("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/70">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-6 border-none bg-transparent p-0"
      >
        <h2 className="text-center mb-2 tracking-wider font-bold text-2xl select-none">
          Admin
        </h2>
        <div>
          <label className="block font-medium mb-1">Username</label>
          <input
            className="w-full border-0 border-b border-primary/30 focus:border-primary focus:ring-0 py-2 px-0 transition-colors duration-200"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Password</label>
          <input
            className="w-full border-0 border-b border-primary/30 focus:border-primary focus:ring-0 py-2 px-0 transition-colors duration-200"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </div>
        {error && (
          <div className="flex items-center gap-2 bg-gradient-to-r from-theme-color to-transparent px-4 py-2 font-medium">
            <span className="text-lg">⚠️</span>
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 mt-2 text-secondary font-bold text-lg transition-all duration-200 bg-primary hover:bg-primary/80 disabled:cursor-not-allowed disabled:bg-primary/80 disabled:text-secondary/80 rounded-md"
          disabled={loading}
        >
          {loading ? "Logging..." : "Login"}
        </button>
      </form>
    </div>
  );
} 
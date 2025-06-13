"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", { email, password });

    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      const { error } = await res.json();
      setError(error);
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold text-center">Admin Login</h1>
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border px-4 py-2 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border px-4 py-2 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </div>
      <div className="hidden md:flex flex-col justify-center bg-gray-900 p-10 text-gray-300">
        <h2 className="text-3xl font-bold mb-4">WorldBridge Mobile</h2>
        <p>
          Access your dashboard from anywhere with our mobile app. Review and
          verify reports on the go while staying in sync with the admin portal.
        </p>
      </div>
    </div>
  );
}

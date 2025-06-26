"use client";

import { useState } from "react";
import { Button, Card, Flex, Heading, TextField, Text } from "@radix-ui/themes";

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
        <Card className="w-full max-w-sm p-6">
          <form onSubmit={handleLogin}>
            <Flex direction="column" gap="3">
              <Heading as="h1" size="4" align="center">
                Admin Login
              </Heading>
              <TextField.Root
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField.Root
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Text color="red" size="2">
                  {error}
                </Text>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </Flex>
          </form>
        </Card>
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

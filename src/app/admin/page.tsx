"use client";

import { useForm } from "react-hook-form";
import { Button, Card, Flex, Heading, TextField, Text } from "@radix-ui/themes";

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      window.location.href = "/dashboard";
    } else {
      const { error } = await res.json();
      setError("root", { type: "server", message: error });
    }
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-sm p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="3">
              <Heading as="h1" size="4" align="center">
                Admin Login
              </Heading>
              <TextField.Root
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <Text color="red" size="2">
                  {errors.email.message}
                </Text>
              )}
              <TextField.Root
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <Text color="red" size="2">
                  {errors.password.message}
                </Text>
              )}
              {errors.root && (
                <Text color="red" size="2">
                  {errors.root.message}
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

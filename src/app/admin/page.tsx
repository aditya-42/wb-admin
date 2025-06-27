"use client";

import { useForm } from "react-hook-form";
import { Button, Card, Flex, TextField, Text } from "@radix-ui/themes";
import Image from "next/image";

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
    <div className="grid min-h-screen md:grid-cols-2 bg-gray-950 text-gray-100">
      {/* Left Side: Login Form */}
      <div className="flex items-center justify-center p-10 bg-gray-950">
        <Card className="w-full max-w-md p-6 border border-gray-800 bg-gray-900 space-y-6">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl font-semibold text-white">Admin @</h1>
            <Image
              src="/logo.svg"
              alt="App Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="3">
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
              <Button color="red" type="submit" className="w-full">
                Login
              </Button>
            </Flex>
          </form>
        </Card>
      </div>

      {/* Right Side: Fullscreen Image */}
      <div className="relative hidden md:block">
        <Image
          src="/branding.svg"
          alt="Branding"
          fill
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
}

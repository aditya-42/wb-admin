"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <>
      <Header />

      <main className="container mx-auto px-4 py-20 space-y-20 text-gray-100 bg-gray-950">
        {/* Hero Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-bold">Whistleblower App</h1>
            <p className="text-muted-foreground">
              An anonymous platform to securely report incidents, fraud, or
              misconduct — without revealing your identity.
            </p>
          </div>

          {/* Right: Big Animated Logo */}
          <div className="flex justify-center md:justify-end">
            <div className="animate-pulse">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={240}
                height={100}
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="space-y-6">
          <h2 className="text-2xl font-bold text-center">App Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center bg-gray-900 border border-gray-800">
              <CardHeader>
                <CardTitle>Anonymous Reporting</CardTitle>
                <CardDescription>
                  No login or personal info required
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                Submit reports without fear. We don’t track or store your
                identity.
              </CardContent>
            </Card>

            <Card className="text-center bg-gray-900 border border-gray-800">
              <CardHeader>
                <CardTitle>Secure by Design</CardTitle>
                <CardDescription>End-to-end encrypted</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                Data is encrypted in transit and at rest for maximum protection.
              </CardContent>
            </Card>

            <Card className="text-center bg-gray-900 border border-gray-800">
              <CardHeader>
                <CardTitle>Track Advocacy</CardTitle>
                <CardDescription>See community engagement</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                Reports can be liked, commented on, and republished anonymously.
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="space-y-4 text-center">
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p className="text-gray-400">
            Have questions or need support? Reach us at{" "}
            <a
              className="text-blue-400 hover:underline"
              href="mailto:support@whistleblower.live"
            >
              support@whistleblower.live
            </a>
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}

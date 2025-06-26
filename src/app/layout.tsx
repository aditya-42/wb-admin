import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";

export const metadata: Metadata = {
  title: "Whistleblower App",
  description: "",
};

const font = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <ResponsiveNav />
        {children}
      </body>
    </html>
  );
}

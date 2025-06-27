"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-gray-950 sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Whistleblower Logo"
            width={40}
            height={40}
          />
          <Link href="/" className="text-lg font-bold text-white">
            Whistleblower
          </Link>
        </div>

        <NavigationMenu.Root className="hidden md:block">
          <NavigationMenu.List className="flex gap-6 items-center">
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  href="#features"
                  className="hover:underline text-gray-300 hover:text-white"
                >
                  Features
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Link
                  href="#contact"
                  className="hover:underline text-gray-300 hover:text-white"
                >
                  Contact
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
            <NavigationMenu.Item>
              <NavigationMenu.Link asChild>
                <Button
                  size="sm"
                  className="bg-red-700 hover:bg-red-600 text-white"
                >
                  Download Now
                </Button>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          <Menu className="text-white" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950">
          <nav className="flex flex-col p-4 gap-2">
            <Link
              href="#features"
              onClick={() => setOpen(false)}
              className="py-2 text-gray-300 hover:text-white"
            >
              Features
            </Link>
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="py-2 text-gray-300 hover:text-white"
            >
              Contact
            </Link>
            <Button
              className="w-full bg-red-700 hover:bg-red-600 text-white"
              size="sm"
              onClick={() => setOpen(false)}
            >
              Download Now
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

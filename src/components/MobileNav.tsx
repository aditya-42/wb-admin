"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const links = [
  { label: "All", href: "/dashboard?tab=all", tab: "all" },
  { label: "Business", href: "/dashboard?tab=business", tab: "business" },
  { label: "Individual", href: "/dashboard?tab=individual", tab: "individual" },
  { label: "Users", href: "/dashboard?tab=users", tab: "users" },
  { label: "Profile", href: "/dashboard?tab=profile", tab: "profile" },
];

export default function MobileNav() {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "all";

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t border-gray-800 bg-gray-900 py-4 md:hidden text-sm">
      {links.map((link) => (
        <Link
          key={link.tab}
          href={link.href}
          className={`px-2 transition ${
            currentTab === link.tab
              ? "text-white font-semibold"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

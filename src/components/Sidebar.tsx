import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-gray-900 text-gray-100">
      <div className="py-6">
        <nav className="space-y-1 px-4">
          <Link
            href="/dashboard?category=all"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800"
          >
            All Reports
          </Link>
          <Link
            href="/dashboard?category=individual"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800"
          >
            Individual Reports
          </Link>
          <Link
            href="/dashboard?category=business"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800"
          >
            Business Reports
          </Link>
        </nav>
      </div>
    </aside>
  );
}

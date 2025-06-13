import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-gray-900 text-gray-100">
      <div className="py-6">
        <nav className="space-y-1 px-4">
          <Link
            href="/dashboard?tab=unverified"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800"
          >
            Unverified Reports
          </Link>
          <Link
            href="/dashboard?tab=verified"
            className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-800"
          >
            Verified Reports
          </Link>
        </nav>
      </div>
    </aside>
  );
}

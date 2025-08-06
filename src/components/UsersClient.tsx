"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
  interests: string[] | null;
  language_interest: string[] | null;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  about: string | null;
  occupation: string | null;
  area_of_expertise: string | null;
  tagline: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
}

// Display only a small subset of user information in the table
const columns: { key: keyof User; label: string }[] = [
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "created_at", label: "Created At" },
];

function getValue(user: User, key: keyof User) {
  const value = user[key];
  if (Array.isArray(value)) return value.join(", ");
  if (key === "created_at" && value) {
    return new Date(value).toLocaleString();
  }
  return value ?? "";
}

export default function UsersClient({ users }: { users: User[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const filtered = users.filter(
    (u) =>
      (u.username || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 text-gray-100">
      <h1 className="text-2xl font-bold">Users</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
        />
      </div>

      <div className="overflow-auto max-h-[500px] rounded-lg border border-gray-700">
        <table className="w-full text-sm bg-gray-900">
          <thead className="bg-gray-800 text-left text-gray-300">
            <tr>
              {columns.map((col) => (
                <th key={col.key as string} className="p-3 font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                onClick={() => router.push(`/profile/${user.id}`)}
                className="cursor-pointer border-t border-gray-800 hover:bg-gray-800 transition"
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className="p-3 break-words max-w-[200px]"
                  >
                    {getValue(user, col.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


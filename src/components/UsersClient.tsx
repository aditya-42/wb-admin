"use client";

import { useState, ReactNode } from "react";
import Image from "next/image";

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

const columns: { key: keyof User; label: string }[] = [
  { key: "id", label: "ID" },
  { key: "username", label: "Username" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "created_at", label: "Created At" },
  { key: "interests", label: "Interests" },
  { key: "language_interest", label: "Language Interest" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "avatar_url", label: "Avatar URL" },
  { key: "about", label: "About" },
  { key: "occupation", label: "Occupation" },
  { key: "area_of_expertise", label: "Area of Expertise" },
  { key: "tagline", label: "Tagline" },
  { key: "country", label: "Country" },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
];

function getValue(user: User, key: keyof User): ReactNode {
  const value = user[key];
  if (key === "avatar_url" && typeof value === "string" && value) {
    return (
      <Image
        src={value}
        alt={user.username ?? "Avatar"}
        width={40}
        height={40}
        className="object-cover rounded-full"
      />
    );
  }
  if (Array.isArray(value)) return value.join(", ");
  if (key === "created_at" && value) {
    return new Date(value).toLocaleString();
  }
  return value ?? "";
}

export default function UsersClient({ users }: { users: User[] }) {
  const [searchQuery, setSearchQuery] = useState("");
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

      <div className="overflow-x-auto max-h-[500px] rounded-lg border border-gray-700">
        <table className="w-full text-sm bg-gray-900 table-fixed">
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
                className="border-t border-gray-800 hover:bg-gray-800 transition"
              >
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className="p-3 break-words"
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


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Report {
  id: number;
  type: "business" | "individual";
  title: string;
  verified: boolean;
  created_at: string;
  name?: string;
  reportNumber?: string;
  userdetails?: { username?: string };
}

interface DashboardClientProps {
  data: {
    approved: Report[];
    unapproved: Report[];
  };
  tab: string;
}

const PAGE_SIZE = 5;

export default function DashboardClient({ data, tab }: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [unverifiedPage, setUnverifiedPage] = useState(1);
  const [verifiedPage, setVerifiedPage] = useState(1);
  const router = useRouter();

  const filterByQuery = (r: Report) => {
    const query = searchQuery.toLowerCase();
    const fields = [
      r.title,
      r.name,
      r.reportNumber,
      r.userdetails?.username,
      String(r.id),
    ].filter(Boolean) as string[];
    return fields.some((f) => f.toLowerCase().includes(query));
  };

  const sortByDateDesc = (a: Report, b: Report) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime();

  const unverifiedFiltered = data.unapproved
    .filter(filterByQuery)
    .sort(sortByDateDesc);
  const verifiedFiltered = data.approved
    .filter(filterByQuery)
    .sort(sortByDateDesc);

  const totalUnverifiedPages = Math.ceil(unverifiedFiltered.length / PAGE_SIZE);
  const totalVerifiedPages = Math.ceil(verifiedFiltered.length / PAGE_SIZE);

  const paginatedUnverified = unverifiedFiltered.slice(
    (unverifiedPage - 1) * PAGE_SIZE,
    unverifiedPage * PAGE_SIZE
  );

  const paginatedVerified = verifiedFiltered.slice(
    (verifiedPage - 1) * PAGE_SIZE,
    verifiedPage * PAGE_SIZE
  );

  const renderTable = (reports: Report[]) =>
    reports.length === 0 ? (
      <div className="p-6 text-center text-sm text-gray-400 border border-dashed border-gray-700 rounded-lg bg-gray-900">
        No reports found.
      </div>
    ) : (
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="w-full table-fixed text-sm bg-gray-900">
          <thead className="bg-gray-800 text-left text-gray-300">
            <tr>
              <th className="p-3 font-medium w-1/3">Title</th>
              <th className="p-3 font-medium w-1/3">Published By</th>
              <th className="p-3 font-medium w-1/3">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr
                key={`${r.id}-${r.type}`}
                className="border-t border-gray-800 hover:bg-gray-800 hover:shadow-md transition duration-300 cursor-pointer"
                onClick={() => router.push(`/reports/${r.type}/${r.id}`)}
              >
                <td className="p-3 break-words max-w-[200px]">{r.title}</td>
                <td className="p-3 break-words max-w-[200px]">
                  {r.userdetails?.username ?? "Unknown"}
                </td>
                <td className="p-3 break-words max-w-[200px]">
                  {new Date(r.created_at).toLocaleDateString("en-GB")} •{" "}
                  {new Date(r.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return (
    <div className="space-y-8 text-gray-100">
      <h1 className="text-2xl font-bold capitalize">{tab} Reports</h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title, name, report number, or user..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
        />
      </div>

      <section id="unverified" className="space-y-4">
        <h2 className="text-xl font-semibold">Unverified</h2>
        {renderTable(paginatedUnverified)}
        <div className="flex gap-2 items-center justify-start mt-2 text-sm">
          <Button
            variant="secondary"
            onClick={() => setUnverifiedPage(Math.max(1, unverifiedPage - 1))}
            disabled={unverifiedPage === 1}
          >
            ← Prev
          </Button>
          <span className="text-gray-400">
            Page {unverifiedPage} of {totalUnverifiedPages}
          </span>
          <Button
            variant="secondary"
            onClick={() =>
              setUnverifiedPage(
                Math.min(totalUnverifiedPages, unverifiedPage + 1)
              )
            }
            disabled={unverifiedPage === totalUnverifiedPages}
          >
            Next →
          </Button>
        </div>
      </section>

      <section id="verified" className="space-y-4">
        <h2 className="text-xl font-semibold">Verified</h2>
        {renderTable(paginatedVerified)}
        <div className="flex gap-2 items-center justify-start mt-2 text-sm">
          <Button
            variant="secondary"
            onClick={() => setVerifiedPage(Math.max(1, verifiedPage - 1))}
            disabled={verifiedPage === 1}
          >
            ← Prev
          </Button>
          <span className="text-gray-400">
            Page {verifiedPage} of {totalVerifiedPages}
          </span>
          <Button
            variant="secondary"
            onClick={() =>
              setVerifiedPage(Math.min(totalVerifiedPages, verifiedPage + 1))
            }
            disabled={verifiedPage === totalVerifiedPages}
          >
            Next →
          </Button>
        </div>
      </section>
    </div>
  );
}

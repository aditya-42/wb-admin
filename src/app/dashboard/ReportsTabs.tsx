"use client";
import Link from "next/link";
import type { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ReportRow {
  id: string;
  type: string;
  title: string;
}

export default function ReportsTabs({
  approved,
  unapproved,
  initialTab,
}: {
  approved: ReportRow[];
  unapproved: ReportRow[];
  initialTab: "verified" | "unverified";
}) {
  const columns: ColumnDef<ReportRow>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <Link
          href={`/reports/${row.original.type}/${row.original.id}`}
          className="underline"
        >
          {row.original.title}
        </Link>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <span className="capitalize">{row.original.type}</span>,
    },
  ];

  return (
    <Tabs defaultValue={initialTab} className="space-y-4">
      <TabsList>
        <TabsTrigger value="unverified">Unverified</TabsTrigger>
        <TabsTrigger value="verified">Verified</TabsTrigger>
      </TabsList>
      <TabsContent value="unverified">
        <DataTable columns={columns} data={unapproved} />
      </TabsContent>
      <TabsContent value="verified">
        <DataTable columns={columns} data={approved} />
      </TabsContent>
    </Tabs>
  );
}

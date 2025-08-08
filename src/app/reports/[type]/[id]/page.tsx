import { supabase } from "@/lib/supabaseClient";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default async function ReportDetail({
  params,
}: {
  params: { type: string; id: string };
}) {
  const { type, id } = params;
  const isBusiness = type === "business";
  const reportId = Number(id);

  const table = isBusiness ? "business_reports" : "individual_reports";
  const idColumn = isBusiness ? "business_report_id" : "individual_report_id";

  const { data: report, error } = await supabase
    .from(table)
    .select(
      `
      *,
      userdetails(username, id),
      categories(initials),
      report_media(media_url, media_type),
      comments(id),
      republish_reports(id),
      likes(id)
    `
    )
    .eq(idColumn, reportId)
    .single();

  if (!report || error) {
    console.error("Failed to fetch report:", error?.message);
    return (
      <p className="text-red-500 text-center">
        Report not found or failed to load.
      </p>
    );
  }

  const reportNumber = `${
    report.categories?.initials ?? "###"
  }-${type[0].toUpperCase()}-${reportId}`;
  const publishDate = new Date(report.created_at).toLocaleDateString();
  const publishTime = new Date(report.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const publisherName = report.userdetails?.username || "Unknown";
  const publisherId = report.userdetails?.id;

  const infoFields = isBusiness
    ? [
        { label: "Business Name", key: "business_name" },
        { label: "Key Person", key: "key_person" },
        { label: "City", key: "city" },
        { label: "State", key: "state" },
        { label: "Country", key: "country" },
        { label: "Postal Code", key: "postal_code" },
        { label: "Business Location", key: "business_location" },
        { label: "Correspondence Address", key: "correspondence_address" },
      ]
    : [
        { label: "Full Name", key: "full_name" },
        { label: "Alias Name", key: "alias_name" },
        { label: "Affiliation", key: "affiliation_name" },
        { label: "Street Address", key: "street_address" },
        { label: "City", key: "city" },
        { label: "State", key: "state" },
        { label: "Country", key: "country" },
        { label: "Postal Code", key: "postal_code" },
        { label: "Height", key: "height" },
        { label: "Weight", key: "weight" },
        { label: "Body Type", key: "body_type" },
        { label: "Gender", key: "gender" },
        { label: "Ethnicity", key: "ethnicity" },
        { label: "Age", key: "age" },
      ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 bg-gray-950 text-gray-100 min-h-screen">
      <div className="space-y-1">
        <Button color="red">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm"
          >
            ← Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-white mt-4 ">Report details</h1>
        <p className="text-gray-400 text-sm">Report Number: {reportNumber}</p>
        <p className="text-gray-400 text-sm">
          Published on: {publishDate} • {publishTime}
        </p>
        <p className="text-gray-400 text-sm">
          Published by:{" "}
          {publisherId ? (
            <a
              href={`/profile/${publisherId}`}
              className="underline text-blue-400 hover:text-blue-300"
            >
              {publisherName}
            </a>
          ) : (
            publisherName
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">
            Matter of the Report
          </h2>
          <p className="whitespace-pre-line text-gray-300">
            {report.incident_details || "N/A"}
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white mb-1">
            Advocacy Stats
          </h2>
          <p className="text-gray-300">
            Advocated By: {report.likes?.length ?? 0} Viewers
          </p>
          <p className="text-gray-300">
            Comments: {report.comments?.length ?? 0}
          </p>
          <p className="text-gray-300">
            Republished: {report.republish_reports?.length ?? 0} Times
          </p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Details of the {isBusiness ? "Organization" : "Individual"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoFields.map((field) => (
            <div key={field.key}>
              <p className="text-sm text-gray-500">{field.label}</p>
              <p className="text-base font-medium text-gray-100">
                {report[field.key] ?? "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {report.report_media?.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white">Attached Media</h2>
          <div className="flex flex-wrap gap-4">
            {report.report_media.map((m: string, idx: number) => {
              const folder = m.media_type?.startsWith("video")
                ? "postVideos"
                : "postImages";
              const mediaUrl = m.media_url.startsWith("http")
                ? m.media_url
                : `https://gdhndglrjbuojsgcziyg.supabase.co/storage/v1/object/public/uploads/${folder}/${m.media_url}`;

              return m.media_type.startsWith("image") ? (
                <Image
                  key={idx}
                  src={mediaUrl}
                  alt="Media"
                  width={256}
                  height={192}
                  className="object-cover rounded border border-gray-700"
                />
              ) : (
                <video
                  key={idx}
                  controls
                  className="w-64 h-48 rounded bg-black border border-gray-700"
                >
                  <source src={mediaUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              );
            })}
          </div>
          <form
            action={`/reports/${type}/${id}/verify-media?state=${report.media_verified}`}
            method="POST"
          >
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded">
              {report.media_verified ? "Unverify Media" : "Verify Media"}
            </button>
          </form>
        </div>
      )}

      {!report.verified && (
        <form action={`/reports/${type}/${id}/approve`} method="POST">
          <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded">
            Approve Report
          </button>
        </form>
      )}
    </div>
  );
}

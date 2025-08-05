import Image from "next/image";
import Link from "next/link";
import { Button } from "@radix-ui/themes";
import { supabase } from "@/lib/supabaseClient";

interface Params {
  params: { id: string };
}

export default async function UserProfile({ params }: Params) {
  const { id } = params;

  const { data: user } = await supabase
    .from("userdetails")
    .select("*")
    .eq("id", id)
    .single();

  if (!user) {
    return <p className="text-center text-red-500">User not found.</p>;
  }

  const interestIds: string[] = user.interests ?? [];
  const languageIds: string[] = user.language_interest ?? [];

  const interestNames: Record<string, string> = {};
  if (interestIds.length) {
    const { data: interests } = await supabase
      .from("interests")
      .select("id, name")
      .in("id", interestIds);
    interests?.forEach((i) => {
      interestNames[i.id] = i.name;
    });
  }

  const languageNames: Record<string, string> = {};
  if (languageIds.length) {
    const { data: languages } = await supabase
      .from("languages")
      .select("id, name")
      .in("id", languageIds);
    languages?.forEach((l) => {
      languageNames[l.id] = l.name;
    });
  }

  const interests = interestIds.map((i) => interestNames[i] ?? i);
  const languages = languageIds.map((l) => languageNames[l] ?? l);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 bg-gray-950 text-gray-100 min-h-screen">
      <Button color="red">
        <Link
          href="/dashboard?tab=users"
          className="inline-flex items-center gap-2 text-sm"
        >
          ← Back
        </Link>
      </Button>
      <h1 className="text-2xl font-bold">{user.username ?? "User"}</h1>
      {user.avatar_url && (
        <Image
          src={user.avatar_url}
          alt={user.username ?? "Avatar"}
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
      )}
      <div className="space-y-2">
        <p>
          <span className="text-gray-400">Email:</span> {user.email || "N/A"}
        </p>
        <p>
          <span className="text-gray-400">Phone:</span> {user.phone || "N/A"}
        </p>
        {interests.length > 0 && (
          <p>
            <span className="text-gray-400">Interests:</span> {interests.join(", ")}
          </p>
        )}
        {languages.length > 0 && (
          <p>
            <span className="text-gray-400">Language Interest:</span> {languages.join(", ")}
          </p>
        )}
      </div>
      <form action={`/profile/${id}/ban`} method="POST">
        <button
          className={`px-4 py-2 rounded text-white ${
            user.is_banned
              ? "bg-green-600 hover:bg-green-500"
              : "bg-red-600 hover:bg-red-500"
          }`}
        >
          {user.is_banned ? "Unban User" : "Ban User"}
        </button>
      </form>
    </div>
  );
}


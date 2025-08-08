import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@radix-ui/themes";
import BanUserButton from "@/components/BanUserButton";
import UnbanUserButton from "@/components/UnbanUserButton";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

interface ProfilePageProps {
  params: { id: string };
}

async function fetchUser(id: string) {
  const { data, error } = await supabase
    .from("userdetails")
    .select("*")
    .eq("id", id)
    .single();

  if (!data || error) {
    return null;
  }

  const interestIds = data.interests ?? [];
  const languageIds = data.language_interest ?? [];

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

  return {
    ...data,
    interests: interestIds.map((id: string) => interestNames[id] ?? id),
    language_interest: languageIds.map((id: string) => languageNames[id] ?? id),
  };
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const user = await fetchUser(params.id);

  if (!user) {
    return (
      <p className="text-red-500 text-center">User not found or failed to load.</p>
    );
  }

  const { data: authData } = await supabaseAdmin.auth.admin.getUserById(params.id);
  const bannedUntil = authData.user?.banned_until as string | null;
  const isBanned = !!bannedUntil && new Date(bannedUntil) > new Date();

  const infoFields = [
    { label: "Username", value: user.username },
    { label: "Email", value: user.email },
    { label: "Phone", value: user.phone },
    { label: "First Name", value: user.first_name },
    { label: "Last Name", value: user.last_name },
    { label: "Interests", value: (user.interests ?? []).join(", ") },
    {
      label: "Languages",
      value: (user.language_interest ?? []).join(", "),
    },
    { label: "About", value: user.about },
    { label: "Occupation", value: user.occupation },
    { label: "Area of Expertise", value: user.area_of_expertise },
    { label: "Tagline", value: user.tagline },
    { label: "Country", value: user.country },
    { label: "State", value: user.state },
    { label: "City", value: user.city },
    {
      label: "Created At",
      value: new Date(user.created_at).toLocaleString(),
    },
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 bg-gray-950 text-gray-100 min-h-screen">
      <Button asChild color="red" variant="outline">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm">
          ← Back to Dashboard
        </Link>
      </Button>

      <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center gap-6 p-6 border-b border-gray-800">
          <Image
            src={user.avatar_url || "/branding.svg"}
            alt="Profile image"
            width={96}
            height={96}
            className="rounded-full object-cover w-24 h-24 border border-gray-700"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">
              {user.username || `${user.first_name} ${user.last_name}` || "User Profile"}
            </h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <BanUserButton userId={user.id} banned={isBanned} />
            <UnbanUserButton userId={user.id} banned={isBanned} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
          {infoFields.map((field) => (
            <div key={field.label}>
              <p className="text-sm text-gray-500">{field.label}</p>
              <p className="text-base font-medium text-gray-100">
                {field.value ?? "N/A"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


"use client";

import { Button } from "@radix-ui/themes";

export default function BanUserButton({ userId }: { userId: string }) {
  const handleBan = async () => {
    const res = await fetch(`/profile/${userId}/ban`, { method: "POST" });
    if (res.ok) {
      alert("User banned successfully");
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error || "Failed to ban user");
    }
  };

  return (
    <Button color="red" onClick={handleBan}>
      Ban User
    </Button>
  );
}

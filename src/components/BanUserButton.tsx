"use client";

import { Button } from "@radix-ui/themes";

interface BanUserButtonProps {
  userId: string;
  banned: boolean;
}

export default function BanUserButton({ userId, banned }: BanUserButtonProps) {
  const handleBan = async () => {
    const res = await fetch(`/profile/${userId}/ban`, { method: "POST" });
    if (res.ok) {
      alert("User banned successfully");
      window.location.reload();
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error || "Failed to ban user");
    }
  };

  return (
    <Button
      color={banned ? "gray" : "red"}
      onClick={handleBan}
      disabled={banned}
    >
      Ban User
    </Button>
  );
}

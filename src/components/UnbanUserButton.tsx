"use client";

import { Button } from "@radix-ui/themes";

interface UnbanUserButtonProps {
  userId: string;
  banned: boolean;
}

export default function UnbanUserButton({ userId, banned }: UnbanUserButtonProps) {
  const handleUnban = async () => {
    const res = await fetch(`/profile/${userId}/unban`, { method: "POST" });
    if (res.ok) {
      alert("User unbanned successfully");
      window.location.reload();
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error || "Failed to unban user");
    }
  };

  return (
    <Button
      color={banned ? "green" : "gray"}
      onClick={handleUnban}
      disabled={!banned}
    >
      Unban User
    </Button>
  );
}

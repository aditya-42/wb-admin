"use client";

import { Button } from "@radix-ui/themes";

export default function UnbanUserButton({ userId }: { userId: string }) {
  const handleUnban = async () => {
    const res = await fetch(`/profile/${userId}/unban`, { method: "POST" });
    if (res.ok) {
      alert("User unbanned successfully");
    } else {
      const data = await res.json().catch(() => null);
      alert(data?.error || "Failed to unban user");
    }
  };

  return (
    <Button color="green" onClick={handleUnban}>
      Unban User
    </Button>
  );
}

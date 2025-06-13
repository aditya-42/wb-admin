import { logoutAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function LogoutPage() {
  logoutAdmin();
  redirect("/admin");
}

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { supabase } from "./supabaseClient";

const SESSION_KEY = "admin_session";

export async function loginAdmin(email: string, password: string) {
  const { data: admin, error } = await supabase
    .from("admin")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !admin) {
    throw new Error("Invalid email or password 2");
  }


  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) {
    throw new Error("Invalid email or password");
  }

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_KEY,
    JSON.stringify({ id: admin.id, email: admin.email }),
    {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    }
  );

  return admin;
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}

export async function getCurrentAdmin(): Promise<{
  id: string;
  email: string;
} | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_KEY);
  if (!session?.value) return null;

  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

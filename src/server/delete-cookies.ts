"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function DeleteCookies() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("user");

  return redirect("/auth/sign-in");
}

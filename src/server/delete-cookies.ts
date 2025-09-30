"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function DeleteCookies() {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("user");

  return redirect("/auth/sign-in");
}

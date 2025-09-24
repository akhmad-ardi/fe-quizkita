"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function DeleteCookies() {
  const cookieStore = await cookies();

  cookieStore.delete("token");

  return redirect("/auth/sign-in");
}

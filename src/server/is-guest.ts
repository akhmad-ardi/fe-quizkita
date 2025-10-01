"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function isGuest() {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("token");
  const userCookie = cookieStore.get("user");

  if (tokenCookie && userCookie) {
    return redirect("/dashboard");
  }
}

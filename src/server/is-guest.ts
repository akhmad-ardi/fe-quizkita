"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function isGuest() {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("token");
  const userCookie = cookieStore.get("user");

  if (tokenCookie && userCookie) {
    return redirect("/dashboard");
  }
}

"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function isGuest() {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken");
  const refreshToken = cookieStore.get("refreshToken");

  if (accessToken && refreshToken) {
    return redirect("/dashboard");
  }
}

"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function SetCookies({ token }: { token: string | undefined }) {
  const cookieStore = await cookies();

  cookieStore.set("token", token ?? "");

  return redirect("/dashboard");
}

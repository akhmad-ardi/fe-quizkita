"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { User } from "@/lib/types";

export async function SetCookies({
  token,
  user,
}: {
  token: string | undefined;
  user: User;
}) {
  const cookieStore = await cookies();

  cookieStore.set("token", token ?? "");
  cookieStore.set("user", JSON.stringify(user));

  return redirect("/dashboard");
}

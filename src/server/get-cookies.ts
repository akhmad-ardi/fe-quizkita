"use server";

import { cookies } from "next/headers";

import { User } from "@/lib/types";

export async function GetCookies() {
  const cookieStore = await cookies();

  const user = cookieStore.get("user");

  return {
    token: cookieStore.get("token"),
    user: JSON.parse(user?.value as string) as User,
  };
}

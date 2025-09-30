"use server";

import { User } from "@/lib/types";
import { cookies } from "next/headers";

export async function GetCookies() {
  const cookieStore = await cookies();

  const user = cookieStore.get("user");

  return {
    token: cookieStore.get("token"),
    user: JSON.parse(user?.value as string) as User,
  };
}

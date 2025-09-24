"use server";

import { cookies } from "next/headers";

export async function GetCookies() {
  const cookieStore = await cookies();

  return {
    token: cookieStore.get("token"),
  };
}

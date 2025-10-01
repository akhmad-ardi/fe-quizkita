"use server";

import { cookies } from "next/headers";

import { Auth } from "@/api/auth";

export async function isAuth() {
  const cookieStore = await cookies();

  const tokenCookie = cookieStore.get("token");
  const userCookie = cookieStore.get("user");

  if (!tokenCookie || !userCookie) {
    return { is_auth: false };
  }

  const { data: validateTokenRes } = await Auth.ValidateToken(
    tokenCookie?.value
  );

  return { is_auth: validateTokenRes.is_auth };
}

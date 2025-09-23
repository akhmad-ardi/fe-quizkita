"use server";

import { cookies } from "next/headers";

export async function SetCookies({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken);
  cookieStore.set("refreshToken", refreshToken);
}

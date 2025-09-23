"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Auth } from "@/api/auth";

export async function isAuth() {
  const cookieStore = await cookies();

  const refreshTokenCookie = cookieStore.get("refreshToken");
  const accessTokenCookie = cookieStore.get("accessToken");

  if (!accessTokenCookie && !refreshTokenCookie) {
    return redirect("/auth/sign-in");
  }

  const { status: statusValidateAccessTokenRes, data: validateAccessTokenRes } =
    await Auth.ValidateAccessToken({
      accessToken: accessTokenCookie?.value as string,
    });

  console.log("validate access token", validateAccessTokenRes.data.is_valid);

  if (
    statusValidateAccessTokenRes !== 200 &&
    !validateAccessTokenRes.data?.is_valid
  ) {
    const { status: statusRefreshTokenRes, data: refreshTokenData } =
      await Auth.RefreshToken({
        refreshToken: refreshTokenCookie?.value as string,
      });

    if (statusRefreshTokenRes !== 200) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");

      return redirect("/auth/sign-in");
    }

    cookieStore.set(
      "accessToken",
      refreshTokenData.data?.accessToken as string
    );
  }
}

import { requestGuest } from "@/lib/axios";
import { SignUpReq, ApiResponse, SignInReq, SignInRes } from "@/lib/types";

export class Auth {
  static async SignUp(data: SignUpReq) {
    return await requestGuest<ApiResponse>({
      method: "POST",
      url: "/auth/sign-up",
      data,
    });
  }

  static async SignIn(data: SignInReq) {
    return await requestGuest<SignInRes>({
      method: "POST",
      url: "/auth/sign-in",
      data,
    });
  }

  static async RefreshToken(data: { refreshToken: string }) {
    return await requestGuest({
      method: "POST",
      url: "/auth/refresh-token",
      headers: {
        Authorization: data.refreshToken ? `Bearer ${data.refreshToken}` : "",
      },
    });
  }
}

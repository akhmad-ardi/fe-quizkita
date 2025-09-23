import { requestAPI } from "@/lib/axios";
import {
  SignUpReq,
  ApiResponse,
  SignInReq,
  SignInRes,
  RefreshTokenReq,
  RefreshTokenRes,
  ValidateAccessTokenRes,
  ValidateAccessTokenReq,
} from "@/lib/types";

export class Auth {
  static async SignUp(data: SignUpReq) {
    return await requestAPI<ApiResponse>({
      method: "POST",
      url: "/auth/sign-up",
      data,
    });
  }

  static async SignIn(data: SignInReq) {
    return await requestAPI<SignInRes>({
      method: "POST",
      url: "/auth/sign-in",
      data,
    });
  }

  static async RefreshToken(data: RefreshTokenReq) {
    return await requestAPI<RefreshTokenRes>({
      method: "POST",
      url: "/auth/refresh-token",
      headers: {
        Authorization: data.refreshToken ? `Bearer ${data.refreshToken}` : "",
      },
    });
  }

  static async ValidateAccessToken(data: ValidateAccessTokenReq) {
    return await requestAPI<ValidateAccessTokenRes>({
      method: "GET",
      url: "/auth/validate-access-token",
      headers: {
        Authorization: data.accessToken ? `Bearer ${data.accessToken}` : "",
      },
    });
  }
}

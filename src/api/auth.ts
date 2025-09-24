import { requestAPI } from "@/lib/axios";
import {
  SignUpReq,
  ApiResponse,
  SignInReq,
  SignInRes,
  ValidatTokenRes,
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

  static async ValidateToken(token: string | undefined) {
    return await requestAPI<ValidatTokenRes>({
      method: "GET",
      url: "/auth/validate-token",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }
}

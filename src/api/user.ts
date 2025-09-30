import { requestAPI } from "@/lib/axios";
import { GetUserRes } from "@/lib/types";

export class User {
  static async GetUser(token: string | undefined) {
    return requestAPI<GetUserRes>({
      method: "GET",
      url: "/users/auth",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

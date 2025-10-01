import { requestAPI } from "@/lib/axios";
import {
  GetUserQuizResultRes,
  SubmitAnswerReq,
  SubmitAnswerRes,
} from "@/lib/types";

export class Quiz {
  static async SubmitAnswer(
    token: string | undefined,
    material_id: string,
    data: SubmitAnswerReq
  ) {
    return requestAPI<SubmitAnswerRes>({
      method: "POST",
      url: `/quiz/${material_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
  }

  static async GetQuizUserResult(
    token: string | undefined,
    material_id: string
  ) {
    return requestAPI<GetUserQuizResultRes>({
      method: "GET",
      url: `/quiz/${material_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

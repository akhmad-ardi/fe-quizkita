import { requestAPI } from "@/lib/axios";
import { SubmitAnswerReq, SubmitAnswerRes } from "@/lib/types";

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
}

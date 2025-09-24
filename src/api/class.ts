import { requestAPI } from "@/lib/axios";
import {
  ApiResponse,
  AddClassReq,
  AddClassRes,
  JoinClassReq,
  AddUserToClassReq,
  GetClassesRes,
  DeleteClassReq,
} from "@/lib/types";

export class Class {
  static async AddClass(token: string | undefined, data: AddClassReq) {
    return await requestAPI<AddClassRes>({
      method: "POST",
      url: "/classes",
      data: { name: data.name },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  static async JoinClass(token: string | undefined, data: JoinClassReq) {
    return await requestAPI<ApiResponse>({
      method: "POST",
      url: "/classes/join",
      data: { invite_code: data.inviteCode },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  static async AddUserToClass(
    token: string | undefined,
    data: AddUserToClassReq
  ) {
    return await requestAPI<ApiResponse>({
      method: "POST",
      url: `/classes/${data.classId}/user`,
      data: { username: data.username },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  static async GetClasses(token: string | undefined) {
    return await requestAPI<GetClassesRes>({
      method: "GET",
      url: "/classes",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  static async DeleteClass(token: string | undefined, data: DeleteClassReq) {
    return await requestAPI<ApiResponse>({
      method: "DELETE",
      url: `/classes/${data.classId}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }
}

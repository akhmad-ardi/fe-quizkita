import { requestAPI } from "@/lib/axios";
import {
  ApiResponse,
  AddClassReq,
  AddClassRes,
  JoinClassReq,
  JoinClassRes,
  AddUserToClassReq,
  AddUserToClassRes,
  GetClassesRes,
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
    return await requestAPI<JoinClassRes>({
      method: "POST",
      url: "/classes/join",
      data: { invite_code: data.invite_code },
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }

  static async AddUserToClass(
    token: string | undefined,
    data: AddUserToClassReq
  ) {
    return await requestAPI<AddUserToClassRes>({
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

  static async DeleteClass(token: string | undefined, classId: string) {
    return await requestAPI<ApiResponse>({
      method: "DELETE",
      url: `/classes/${classId}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }
}

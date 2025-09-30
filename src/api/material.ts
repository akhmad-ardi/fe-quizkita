import { requestAPI } from "@/lib/axios";
import {
  AddMaterialReq,
  AddMaterialRes,
  ApiResponse,
  GetMaterialRes,
  GetMaterialsRes,
} from "@/lib/types";

export class Material {
  static async AddMaterial(token: string | undefined, data: AddMaterialReq) {
    return requestAPI<AddMaterialRes>({
      method: "POST",
      url: "/materials",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    });
  }

  static async GetMaterials(token: string | undefined, classId: string) {
    return requestAPI<GetMaterialsRes>({
      method: "GET",
      url: `/materials/${classId}/class`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async GetMaterial(token: string | undefined, materialId: string) {
    return requestAPI<GetMaterialRes>({
      method: "GET",
      url: `/materials/${materialId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async DeleteMaterial(token: string | undefined, materialId: string) {
    return requestAPI<ApiResponse>({
      method: "DELETE",
      url: `/materials/${materialId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

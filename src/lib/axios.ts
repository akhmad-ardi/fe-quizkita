import axios, { AxiosError, AxiosRequestConfig } from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

const axiosInstance = axios.create({
  baseURL,
});

export async function requestAPI<T>(
  config: AxiosRequestConfig
): Promise<{ status: number; data: T }> {
  try {
    const res = await axiosInstance.request<T>(config);

    return { status: res.status, data: res.data };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: error.response?.status ?? 500,
        data: (error.response?.data ?? { message: "something error" }) as T,
      };
    }
    return {
      status: 500,
      data: { message: "something error" } as T,
    };
  }
}

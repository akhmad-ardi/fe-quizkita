import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.BACKEND_URL || "http://localhost:4000";
const token = Cookies.get("accessToken");

const axiosGuest = axios.create({
  baseURL,
});

const axiosAuth = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

async function requestAPI<T>(
  client: AxiosInstance,
  config: AxiosRequestConfig
): Promise<{ status: number; data: T }> {
  try {
    const res = await client.request<T>(config);

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

// Request as a Guest
export const requestGuest = <T>(config: AxiosRequestConfig) =>
  requestAPI<T>(axiosGuest, config);

// Request as a User Authenticated
export const requestAuth = <T>(config: AxiosRequestConfig) =>
  requestAPI<T>(axiosAuth, config);

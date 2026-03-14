import {
  ClientResponse,
  COMMON_RESPONSE_STATUS,
  CommonResponseNew,
} from "@/types";
import axios from "axios";

export const HEADERS = {
  "Content-Type": "application/json",
};

//Base instance
const instance = axios.create({
  baseURL: "",
  headers: { ...HEADERS },
  withCredentials: true,
});

// 1. Turn apiClient into an object with a generic .post method
export const apiClient = {
  post: async <TResponse = any, TRequest = any>({
    namespace,
    apiName,
    data,
  }: {
    namespace: string;
    apiName: string;
    data: TRequest;
  }): Promise<ClientResponse<TResponse>> => {
    const response = await instance.post<CommonResponseNew<TResponse>>(
      "/api/proxy",
      {
        namespace,
        apiName,
        data,
      },
    );

    if (response.data.status === COMMON_RESPONSE_STATUS.ERROR) {
      throw new Error(response.data.data.message || "API Error");
    }

    return response.data.data;
  },
};

export const apiClientForSSR = async ({
  url,
  token,
}: {
  url: string;
  token?: string;
}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: "GET",
    headers: {
      Cookie: `token=${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch feed");
  }

  return res.json();
};

import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { BaseResponse, CommonResponse } from "@/types";
import { IUser } from "@/module/auth/types";
import { REQUEST_STATUS } from "../types";

export const API_USER = `/user`;
const API_REQUEST = `/request`;

const useFeed = (options = {}) => {
  return useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const response = await apiClient.get<CommonResponse<IUser[]>>(
        `${API_USER}/feed`,
      );
      return response.data;
    },
    ...options,
  });
};
const useSendConnectionRequest = () => {
  return useMutation({
    mutationFn: async ({
      status,
      toUserId,
    }: {
      status: REQUEST_STATUS;
      toUserId: string;
    }) => {
      const response = await apiClient.post<BaseResponse>(
        `${API_REQUEST}/send/${status}/${toUserId}`,
        {},
      );
      return response.data;
    },
  });
};
export { useFeed, useSendConnectionRequest };

import { apiClient } from "@/lib/api";
import { BaseResponse, CommonResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IUser } from "@/module/auth/types";
import { API_REQUEST, API_USER } from "@/module/feed/hooks/useFeed";
import { IConnectionRequests } from "../types";
import { REQUEST_STATUS } from "@/module/feed/types";

const useGetRequests = (options = {}) => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await apiClient.get<
        CommonResponse<IConnectionRequests[]>
      >(`${API_USER}/requests/interested`);
      return response.data;
    },
    ...options,
  });
};
const useReviewConnectionRequest = () => {
  return useMutation({
    mutationFn: async ({
      status,
      requestId,
    }: {
      status: REQUEST_STATUS;
      requestId: string;
    }) => {
      const response = await apiClient.post<BaseResponse>(
        `${API_REQUEST}/review/${status}/${requestId}`,
        {},
      );
      return response.data;
    },
  });
};
export { useGetRequests, useReviewConnectionRequest };

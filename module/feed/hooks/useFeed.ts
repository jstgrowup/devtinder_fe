import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { BaseResponse, CommonResponse, PaginatedQuery } from "@/types";
import { IUser } from "@/module/auth/types";
import { REQUEST_STATUS } from "../types";

export const API_USER = `/user`;
export const API_REQUEST = `/request`;

const useFeed = (
  query: PaginatedQuery,
  options?: { initialData?: CommonResponse<IUser[]> },
) => {
  return useQuery({
    queryKey: ["feed", query.limit, query.page],
    queryFn: async () => {
      const response = await apiClient.get<CommonResponse<IUser[]>>(
        `${API_USER}/feed?limit=${query.limit}`,
      );
      return response.data;
    },
    // Start with this data instead of calling the API immediately.
    initialData: options?.initialData,
    // Consider this data fresh for 1 minute. otherwise Data becomes stale immediately
    staleTime: 1000 * 60,
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

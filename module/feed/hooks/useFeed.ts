import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { BaseResponse, NAMESPACES, PaginatedQuery } from "@/types";
import { IUser } from "@/module/auth/types";
import { REQUEST_STATUS } from "../types";

const useFeed = () => {
  return useMutation({
    mutationFn: async (body: PaginatedQuery) => {
      return await apiClient.post<IUser[], PaginatedQuery>({
        namespace: NAMESPACES.USER,
        data: body,
        apiName: "feed",
      });
    },
  });
};

const useSendConnectionRequest = () => {
  return useMutation({
    mutationFn: async (body: { status: REQUEST_STATUS; toUserId: string }) => {
      return await apiClient.post<
        BaseResponse,
        { status: REQUEST_STATUS; toUserId: string }
      >({
        namespace: NAMESPACES.REQUESTS,
        data: body,
        apiName: "send",
      });
    },
  });
};
export { useSendConnectionRequest, useFeed };

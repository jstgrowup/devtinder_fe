import { apiClient } from "@/lib/api";
import { BaseResponse, NAMESPACES } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IConnectionRequests } from "../types";
import { REQUEST_STATUS } from "@/module/feed/types";

const useGetRequests = () => {
  return useQuery({
    queryKey: ["interested-requests"],
    queryFn: async (body: {}) => {
      return await apiClient.post<IConnectionRequests[], {}>({
        namespace: NAMESPACES.USER,
        apiName: "interested-requests",
        data: body,
      });
    },
  });
};

const useReviewConnectionRequest = () => {
  return useMutation({
    mutationFn: async (body: { status: REQUEST_STATUS; requestId: string }) => {
      const response = await apiClient.post<
        BaseResponse,
        {
          status: REQUEST_STATUS;
          requestId: string;
        }
      >({ namespace: NAMESPACES.REQUESTS, apiName: "review", data: body });
      return response.data;
    },
  });
};
export { useGetRequests, useReviewConnectionRequest };

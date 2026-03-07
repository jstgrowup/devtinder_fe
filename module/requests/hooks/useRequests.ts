import { apiClient } from "@/lib/api";
import { BaseResponse, NAMESPACES } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IConnectionRequests, IPaymentReq, IPaymentResponse } from "../types";
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
      return await apiClient.post<
        BaseResponse,
        {
          status: REQUEST_STATUS;
          requestId: string;
        }
      >({ namespace: NAMESPACES.REQUESTS, apiName: "review", data: body });
    },
  });
};

const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (body: IPaymentReq) => {
      const response = await apiClient.post<IPaymentResponse, IPaymentReq>({
        namespace: NAMESPACES.PAYMENT,
        apiName: "create",
        data: body,
      });
      return response.data;
    },
  });
};

const useCreateGetStreamRoomId = () => {
  return useMutation({
    mutationFn: async (body: {}) => {
      const response = await apiClient.post<string, {}>({
        namespace: NAMESPACES.GET_STREAM,
        apiName: "create-roomId",
        data: body,
      });
      return response.data;
    },
  });
};

const useCreateGetStreamToken = () => {
  return useMutation({
    mutationFn: async (body: {}) => {
      const response = await apiClient.post<string, {}>({
        namespace: NAMESPACES.GET_STREAM,
        apiName: "create-token",
        data: body,
      });
      return response.data;
    },
  });
};

export {
  useGetRequests,
  useReviewConnectionRequest,
  useCreateOrder,
  useCreateGetStreamRoomId,
  useCreateGetStreamToken,
};

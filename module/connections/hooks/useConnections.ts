import { apiClient } from "@/lib/api";
import { CommonResponseNew } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { IConnections } from "../types";

const useGetConnections = () => {
  return useMutation({
    mutationFn: async (body: {}) => {
      const response = await apiClient.post<CommonResponseNew<IConnections[]>>(
        `${process.env.NEXT_PUBLIC_BASE_API}`,
        body,
      );
      return response.data;
    },
  });
};
export { useGetConnections };

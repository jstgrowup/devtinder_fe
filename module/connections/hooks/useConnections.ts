import { apiClient } from "@/lib/api";
import { CommonResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IConnections } from "../types";

const API_USER = "/user";

const useGetConnections = (options = {}) => {
  return useQuery({
    queryKey: ["user-connections"],
    queryFn: async () => {
      const response = await apiClient.get<CommonResponse<IConnections[]>>(
        `${API_USER}/requests/connections`,
      );
      return response.data;
    },
    ...options,
  });
};
export { useGetConnections };

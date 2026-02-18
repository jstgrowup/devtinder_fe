import { apiClient } from "@/lib/api";
import { CommonResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/module/auth/types";
import { API_USER } from "@/module/feed/hooks/useFeed";

const useGetRequests = (options = {}) => {
  return useQuery({
    queryKey: ["requests"],
    queryFn: async () => {
      const response = await apiClient.get<CommonResponse<IUser>>(
        `${API_USER}/requests/interested`,
      );
      return response.data;
    },
    ...options,
  });
};
export { useGetRequests };

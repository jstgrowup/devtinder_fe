import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { CommonResponse } from "@/types";
import { IUser } from "@/module/auth/types";

const API_USER = `/user`;
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

export { useFeed };

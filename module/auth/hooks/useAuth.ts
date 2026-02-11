import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginSchemaType } from "../utils/zod";
import { apiClient } from "@/lib/api";
import { CommonResponse } from "@/types";
import { IUser } from "../types";

const API_AUTH = `/auth`;
const API_PROFILE = `/profile`;
const useLogin = () => {
  return useMutation({
    mutationFn: async (body: LoginSchemaType) => {
      const response = await apiClient.post<CommonResponse<IUser>>(
        `${API_AUTH}/login`,
        body,
      );
      return response.data;
    },
  });
};

const useProfile = (options = {}) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await apiClient.get<CommonResponse<IUser>>(
        `${API_PROFILE}/me`,
      );
      return response.data;
    },
    ...options,
  });
};

export { useLogin, useProfile };

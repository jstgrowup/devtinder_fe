import { apiClient } from "@/lib/api";
import { BaseResponse, CommonResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditProfileSchemaType } from "../utils/zod";
import { IUser } from "@/module/auth/types";
export const API_PROFILE = "/profile";
const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (body: EditProfileSchemaType) => {
      const response = await apiClient.patch<BaseResponse>(
        `${API_PROFILE}/edit`,
        body,
      );
      return response.data;
    },
  });
};

const useGetProfile = (options = {}) => {
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
export { useUpdateProfile, useGetProfile };

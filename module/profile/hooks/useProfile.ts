import { apiClient } from "@/lib/api";
import { BaseResponse, NAMESPACES } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EditProfileSchemaType } from "../utils/zod";
import { IUser } from "@/module/auth/types";
export const API_PROFILE = "/profile";

const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (body: EditProfileSchemaType) => {
      return await apiClient.post<BaseResponse, EditProfileSchemaType>({
        namespace: NAMESPACES.PROFILE,
        apiName: "edit",
        data: body,
      });
    },
  });
};
const useGetProfile = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async (body: {}) => {
      return await apiClient.post<IUser, {}>({
        namespace: NAMESPACES.PROFILE,
        apiName: "me",
        data: body,
      });
    },
  });
};

export { useUpdateProfile, useGetProfile };

import { useMutation, useQuery } from "@tanstack/react-query";
import { LoginSchemaType, SignupSchemaType } from "../utils/zod";
import { apiClient } from "@/lib/api";
import { BaseResponse, CommonResponse } from "@/types";
import { IUser } from "../types";

const API_AUTH = `/auth`;
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
const useSignup = () => {
  return useMutation({
    mutationFn: async (body: SignupSchemaType) => {
      const response = await apiClient.post<BaseResponse>(
        `${API_AUTH}/signup`,
        body,
      );
      return response.data;
    },
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.post<CommonResponse<IUser>>(
        `${API_AUTH}/logout`,
      );
      return response.data;
    },
  });
};
export { useLogin, useLogout, useSignup };

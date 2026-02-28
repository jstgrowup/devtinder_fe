import { useMutation } from "@tanstack/react-query";
import { LoginSchemaType, SignupSchemaType } from "../utils/zod";
import { apiClient } from "@/lib/api";
import { CommonReqBody, CommonResponse, CommonResponseNew } from "@/types";
import { IUser } from "../types";

const useLogin = () => {
  return useMutation({
    mutationFn: async (body: CommonReqBody<LoginSchemaType>) => {
      const response = await apiClient.post<CommonResponseNew<IUser>>(
        `${process.env.NEXT_PUBLIC_BASE_API}`,
        body,
      );
      return response.data;
    },
  });
};

const useSignup = () => {
  return useMutation({
    mutationFn: async (body: CommonReqBody<SignupSchemaType>) => {
      const response = await apiClient.post<CommonResponseNew<IUser>>(
        `${process.env.NEXT_PUBLIC_BASE_API}`,
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
        `${process.env.NEXT_PUBLIC_BASE_API}/logout`,
      );
      return response.data;
    },
  });
};
export { useLogin, useLogout, useSignup };

import { useMutation } from "@tanstack/react-query";
import { LoginSchemaType, SignupSchemaType } from "../utils/zod";
import { apiClient } from "@/lib/api";
import { NAMESPACES } from "@/types";
import { IUser } from "../types";

const useLogin = () => {
  return useMutation({
    mutationFn: async (body: LoginSchemaType) => {
      return await apiClient.post<IUser, LoginSchemaType>({
        namespace: NAMESPACES.AUTH,
        apiName: "login",
        data: body,
      });
    },
  });
};

const useSignup = () => {
  return useMutation({
    mutationFn: async (body: SignupSchemaType) => {
      return await apiClient.post<IUser, SignupSchemaType>({
        namespace: NAMESPACES.AUTH,
        apiName: "signup",
        data: body,
      });
    },
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: async (body: {}) => {
      return await apiClient.post<IUser, {}>({
        namespace: NAMESPACES.AUTH,
        apiName: "logout",
        data: body,
      });
    },
  });
};
export { useLogin, useLogout, useSignup };

import { useMutation } from "@tanstack/react-query";
import { LoginSchemaType, SignupSchemaType } from "../utils/zod";
import { apiClient } from "@/lib/api";
import { ClientResponse, NAMESPACES } from "@/types";
import { IUser } from "../types";

const useLogin = () => {
  return useMutation({
    mutationFn: async (body: LoginSchemaType) => {
      return apiClient.post<ClientResponse<IUser>, LoginSchemaType>({
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
      return apiClient.post<ClientResponse<IUser>, SignupSchemaType>({
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
      return apiClient.post<IUser, {}>({
        namespace: NAMESPACES.AUTH,
        apiName: "logout",
        data: body,
      });
    },
  });
};
export { useLogin, useLogout, useSignup };

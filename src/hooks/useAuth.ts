import { useMutation } from "@tanstack/react-query";
import type { LoginSchemaType } from "../types/auth";
import { apiClient } from "../utils/apiClient";
import type { CommonResponse, IUser } from "../types";

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
export { useLogin };

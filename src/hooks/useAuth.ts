import { useMutation } from "@tanstack/react-query";
import type { LoginSchemaType } from "../types/auth";
import { apiClient } from "../utils/apiClient";
import type { BaseResponse } from "../types";

const API_AUTH = `/auth`;

const useLogin = () => {
  return useMutation({
    mutationFn: async (body: LoginSchemaType) => {
      const response = await apiClient.post<BaseResponse>(
        `${API_AUTH}/login`,
        body,
      );
      return response.data;
    },
  });
};
export { useLogin };

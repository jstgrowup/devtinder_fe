import { apiClient } from "@/lib/api";
import { NAMESPACES } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/module/auth/types";

const useGetConnections = () => {
  return useQuery({
    queryKey: ["interested-connections"],
    queryFn: async (body: {}) => {
      return await apiClient.post<IUser[], any>({
        namespace: NAMESPACES.USER,
        data: body,
        apiName: "interested-connections",
      });
    },
  });
};
export { useGetConnections };

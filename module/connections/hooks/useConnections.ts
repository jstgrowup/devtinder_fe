import { apiClient } from "@/lib/api";
import { NAMESPACES } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IConnections } from "../types";

const useGetConnections = () => {
  return useQuery({
    queryKey: ["interested-connections"],
    queryFn: async (body: {}) => {
      return await apiClient.post<IConnections[], any>({
        namespace: NAMESPACES.USER,
        data: body,
        apiName: "interested-connections",
      });
    },
  });
};
export { useGetConnections };

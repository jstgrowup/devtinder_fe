import { apiClient } from "@/lib/api";
import { NAMESPACES, PaginatedQuery } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { IUser } from "@/module/auth/types";

const useGetConnections = (body: PaginatedQuery) => {
  return useQuery({
    queryKey: ["interested-connections", body],
    queryFn: async () => {
      return await apiClient.post<IUser[], PaginatedQuery>({
        namespace: NAMESPACES.USER,
        data: body,
        apiName: "interested-connections",
      });
    },
  });
};
export { useGetConnections };

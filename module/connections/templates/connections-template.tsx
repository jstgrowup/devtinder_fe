"use client";

import { useGetConnections } from "../hooks/useConnections";

const ConnectionsTemplate = () => {
  const { data, isLoading } = useGetConnections();
  console.log("data:", data);

  return <div>ConnectionsTemplate</div>;
};

export default ConnectionsTemplate;

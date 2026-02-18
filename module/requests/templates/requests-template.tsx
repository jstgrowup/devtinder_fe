"use client";

import { useGetRequests } from "../hooks/useRequests";

const RequestTemplate = () => {
  const { data: userRequests } = useGetRequests();
  console.log("userRequests:", userRequests);

  return <div>RequestTemplate</div>;
};

export default RequestTemplate;

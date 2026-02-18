"use client";

import { ActionUserCard } from "@/module/requests/components/action-user-card";
import { useGetConnections } from "../hooks/useConnections";

const ConnectionsTemplate = () => {
  const { data: connections, isLoading } = useGetConnections();

  return (
    <>
      {connections?.data.map((request) => (
        <ActionUserCard
          key={request._id}
          connectionRequestId={request._id}
          name={request.fromUserId.firstName}
          about={request.fromUserId.about}
          photoUrl={request.fromUserId.photoUrl}
          age={request.fromUserId.age}
          gender={request.fromUserId.gender}
          actionsAllowed={false}
        />
      ))}
    </>
  );
};

export default ConnectionsTemplate;

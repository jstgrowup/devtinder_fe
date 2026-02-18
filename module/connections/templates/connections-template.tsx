"use client";

import { ActionUserCard } from "@/module/requests/components/action-user-card";
import { useGetConnections } from "../hooks/useConnections";
import { CommonLoader } from "@/components/common/loader";
import DataEmptyHandler from "@/components/common/common-data-empty-handler";
import { IConnections } from "../types";

const ConnectionsTemplate = () => {
  const { data: connections, isPending } = useGetConnections();
  if (isPending) {
    return <CommonLoader fullScreen={true} />;
  }
  return (
    <>
      <DataEmptyHandler<IConnections>
        data={connections?.data}
        emptyMessage="No connections available"
      >
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
      </DataEmptyHandler>
    </>
  );
};

export default ConnectionsTemplate;

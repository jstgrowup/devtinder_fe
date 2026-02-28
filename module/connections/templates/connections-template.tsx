"use client";

import { ActionUserCard } from "@/module/requests/components/action-user-card";
import { useGetConnections } from "../hooks/useConnections";
import { CommonLoader } from "@/components/common/Loader";
import DataEmptyHandler from "@/components/common/common-data-empty-handler";
import { IConnections } from "../types";
import { useEffect, useState } from "react";
import { NAMESPACES } from "@/types";

const ConnectionsTemplate = () => {
  const { mutate: getConnections, isPending } = useGetConnections();
  const [connections, setConnections] = useState<IConnections[]>([]);
  useEffect(() => {
    getConnections(
      {
        namespace: NAMESPACES.USER,
        data: {},
        apiName: "interested-connections",
      },
      {
        onSuccess: (response) => {
          setConnections(response.data.data);
        },
      },
    );
  }, []);

  if (isPending) {
    return <CommonLoader fullScreen={true} />;
  }
  return (
    <>
      <DataEmptyHandler<IConnections>
        data={connections}
        emptyMessage="No connections available"
      >
        {connections?.map((request) => (
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

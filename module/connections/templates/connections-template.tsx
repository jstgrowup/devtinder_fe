"use client";
import { ActionUserCard } from "@/module/requests/components/action-user-card";
import { useGetConnections } from "../hooks/useConnections";
import { CommonLoader } from "@/components/common/Loader";
import DataEmptyHandler from "@/components/common/common-data-empty-handler";
import { IConnections } from "../types";
import { IUser } from "@/module/auth/types";

const ConnectionsTemplate = () => {
  const { data: response, isPending } = useGetConnections();

  if (isPending) {
    return <CommonLoader fullScreen={true} />;
  }
  return (
    <>
      <DataEmptyHandler<IUser>
        data={response?.data}
        emptyMessage="No connections available"
      >
        {response?.data?.map((request) => (
          <ActionUserCard
            key={request._id}
            connectionRequestId={request._id}
            name={request.firstName}
            about={request.about}
            photoUrl={request.photoUrl}
            age={request.age}
            gender={request.gender}
            actionsAllowed={false}
            toUserId={request._id}
          />
        ))}
      </DataEmptyHandler>
    </>
  );
};

export default ConnectionsTemplate;

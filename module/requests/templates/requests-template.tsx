"use client";

import { REQUEST_STATUS } from "@/module/feed/types";
import { ActionUserCard } from "../components/action-user-card";
import {
  useGetRequests,
  useReviewConnectionRequest,
} from "../hooks/useRequests";
import { openErrorToast, openSuccessToast } from "@/components/common/toast";
import DataEmptyHandler from "@/components/common/common-data-empty-handler";
import { IConnectionRequests } from "../types";
import { CommonLoader } from "@/components/common/loader";

const RequestTemplate = () => {
  const {
    data: userRequests,
    refetch: refetchRequests,
    isPending: isRequestsPending,
  } = useGetRequests();
  const { mutate: reviewConnectionRequest } = useReviewConnectionRequest();

  const handleReviewRequest = ({
    status,
    requestId,
  }: {
    status: REQUEST_STATUS;
    requestId: string;
  }) => {
    reviewConnectionRequest(
      { status, requestId },
      {
        onSuccess: async (response) => {
          openSuccessToast({ message: response.message });
          await refetchRequests();
        },
        onError: (error) => {
          openErrorToast({ error });
        },
      },
    );
  };

  if (isRequestsPending) {
    return <CommonLoader fullScreen={true} />;
  }

  return (
    <>
      <DataEmptyHandler<IConnectionRequests>
        data={userRequests?.data}
        emptyMessage="No requests available"
      >
        {userRequests?.data.map((request) => (
          <ActionUserCard
            key={request._id}
            connectionRequestId={request._id}
            name={request.fromUserId.firstName}
            about={request.fromUserId.about}
            photoUrl={request.fromUserId.photoUrl}
            handleReviewRequest={handleReviewRequest}
            age={request.fromUserId.age}
            gender={request.fromUserId.gender}
          />
        ))}
      </DataEmptyHandler>
    </>
  );
};

export default RequestTemplate;

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
import { CommonLoader } from "@/components/common/Loader";
import { useQueryClient } from "@tanstack/react-query";

const RequestTemplate = () => {
  const { data: response, isPending: isRequestsPending } = useGetRequests();

  const queryClient = useQueryClient();

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
          openSuccessToast({ message: response?.message });
          await queryClient.fetchQuery({
            queryKey: ["interested-requests"],
          });
        },
        onError: (error) => {
          openErrorToast({ message: error.message });
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
        data={response?.data}
        emptyMessage="No requests available"
      >
        {response?.data?.map((request) => (
          <ActionUserCard
            key={request._id}
            connectionRequestId={request._id}
            name={request.fromUserId.firstName}
            about={request.fromUserId.about}
            photoUrl={request.fromUserId.photoUrl}
            handleReviewRequest={handleReviewRequest}
            age={request.fromUserId.age}
            gender={request.fromUserId.gender}
            toUserId={request.fromUserId._id}
          />
        ))}
      </DataEmptyHandler>
    </>
  );
};

export default RequestTemplate;

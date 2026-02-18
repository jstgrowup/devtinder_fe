"use client";
import { CommonLoader } from "@/components/common/loader";
import UserCard from "../components/user-cards";
import { useFeed, useSendConnectionRequest } from "../hooks/useFeed";
import { openErrorToast, openSuccessToast } from "@/components/common/toast";
import { REQUEST_STATUS } from "../types";

const FeedTemplate = () => {
  const { data: feedUsers, isLoading, refetch: feedRefetch } = useFeed();
  const { mutate: sendConnectionRequest, isPending } =
    useSendConnectionRequest();

  if (isLoading) {
    return <CommonLoader fullScreen={true} />;
  }
  const handleAcceptOrReject = ({
    status,
    toUserId,
  }: {
    status: REQUEST_STATUS;
    toUserId: string;
  }) => {
    sendConnectionRequest(
      {
        status,
        toUserId,
      },
      {
        onSuccess: async (response) => {
          openSuccessToast({ message: response.message });
          await feedRefetch();
        },
        onError: (error) => {
          openErrorToast({ error });
        },
      },
    );
  };
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {feedUsers?.data?.map((feedUser) => (
          <UserCard
            {...feedUser}
            key={feedUser._id}
            handleAcceptOrReject={handleAcceptOrReject}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedTemplate;

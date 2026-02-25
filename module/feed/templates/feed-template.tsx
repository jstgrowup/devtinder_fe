"use client";
import { CommonLoader } from "@/components/common/Loader";
import UserCard from "../components/user-cards";
import { useFeed, useSendConnectionRequest } from "../hooks/useFeed";
import { openErrorToast, openSuccessToast } from "@/components/common/toast";
import { REQUEST_STATUS } from "../types";
import { useState } from "react";

const FeedTemplate = () => {
  const {
    data: feedUsers,
    isLoading,
    refetch: feedRefetch,
    isFetching,
  } = useFeed({ limit: 5 });
  const { mutate: sendConnectionRequest, isPending } =
    useSendConnectionRequest();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [actionLoading, setActionLoading] = useState<REQUEST_STATUS | null>(
    null,
  );
  const users = feedUsers?.data || [];

  const currentUser = users[currentIndex];

  if (isLoading) {
    return <CommonLoader fullScreen={true} />;
  }
  const goToNextUser = async () => {
    const nextIndex = currentIndex + 1;

    if (nextIndex < users.length) {
      setCurrentIndex(nextIndex);
    } else {
      const response = await feedRefetch();

      if (response.data?.data?.length) {
        setCurrentIndex(0);
      }
    }
  };
  const handleAcceptOrReject = ({
    status,
    toUserId,
  }: {
    status: REQUEST_STATUS;
    toUserId: string;
  }) => {
    setActionLoading(status);
    sendConnectionRequest(
      {
        status,
        toUserId,
      },
      {
        onSuccess: async (response) => {
          openSuccessToast({ message: response.message });
          setActionLoading(null);
          goToNextUser();
        },
        onError: (error) => {
          setActionLoading(null);
          openErrorToast({ error });
        },
      },
    );
  };
  return (
    <div className="flex justify-center items-center h-[80vh]">
      {currentUser ? (
        <UserCard
          {...currentUser}
          key={currentUser._id}
          handleAcceptOrReject={handleAcceptOrReject}
          actionLoading={actionLoading}
        />
      ) : isFetching ? (
        <CommonLoader />
      ) : (
        <p className="text-gray-500 text-lg">No more users 🎉</p>
      )}
    </div>
  );
};

export default FeedTemplate;

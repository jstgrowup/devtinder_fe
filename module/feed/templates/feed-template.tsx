"use client";
import { CommonLoader } from "@/components/common/Loader";
import UserCard from "../components/user-cards";
import { useFeed, useSendConnectionRequest } from "../hooks/useFeed";
import { openErrorToast, openSuccessToast } from "@/components/common/Toast";
import { REQUEST_STATUS } from "../types";
import { useEffect, useState } from "react";
import { IUser } from "@/module/auth/types";

const FeedTemplate = () => {
  const [feedUsers, setFeedUsers] = useState<IUser[] | undefined>([]);

  const { mutate: getFeedUsers, isPending } = useFeed();

  useEffect(() => {
    getFeedUsers(
      { limit: 4 },
      {
        onSuccess: (response) => {
          setFeedUsers(response);
        },
        onError: (error) => {
          openErrorToast({ message: error.message });
        },
      },
    );
  }, []);

  const { mutate: sendConnectionRequest } = useSendConnectionRequest();
  // For controlling the index of the current user
  const [currentIndex, setCurrentIndex] = useState(0);
  // For controlling the loading in a segregated way for both the accept and reject buttons
  const [actionLoading, setActionLoading] = useState<REQUEST_STATUS | null>(
    null,
  );
  const users = feedUsers || [];
  // The current cowed profile ready to be accepted/rejected
  const currentUser = users[currentIndex];

  if (isPending) {
    return <CommonLoader fullScreen={true} />;
  }
  // Function to control the swiping
  const goToNextUser = async () => {
    // Get the next index
    const nextIndex = currentIndex + 1;
    // IF there is still users left until the next fetch
    if (nextIndex < users.length) {
      // Update the curent index it will set the current user as well
      setCurrentIndex(nextIndex);
    } else {
      // If there is no user left to swipe we call the api to get the next set of users
      getFeedUsers(
        { limit: 4 },
        {
          onSuccess: (response) => {
            setFeedUsers(response);
          },
          onError: (error) => {
            openErrorToast({ message: error.message });
          },
        },
      );

      if (feedUsers?.length) {
        // If the user has swiped all the users and no user left for him/her to swipe
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
    // We set the request status for controlling the loading of different buttons
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
          // After refetch call the we cna update the current index and that will update the current user
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
      ) : isPending ? (
        <CommonLoader />
      ) : (
        <p className="text-gray-500 text-lg">No more users 🎉</p>
      )}
    </div>
  );
};

export default FeedTemplate;

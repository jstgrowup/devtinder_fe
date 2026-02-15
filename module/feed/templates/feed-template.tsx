"use client";
import CommonLoader from "@/components/common/Loader";
import UserCard from "../components/user-cards";
import { useFeed } from "../hooks/useFeed";

const FeedTemplate = () => {
  const { data: feedUsers, isLoading } = useFeed();
  if (isLoading) {
    return <CommonLoader />;
  }
  return (
    <>
      {feedUsers?.data?.map((feedUser) => (
        <UserCard {...feedUser} key={feedUser._id} />
      ))}
    </>
  );
};

export default FeedTemplate;

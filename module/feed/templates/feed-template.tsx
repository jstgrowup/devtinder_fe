"use client";
import UserCard from "../components/user-cards";
import { useFeed } from "../hooks/useFeed";

const FeedTemplate = () => {
  const { data: feedUsers, isLoading } = useFeed();
  console.log("feedUsers:", feedUsers);

  return (
    <>
      {feedUsers?.data?.map((feedUser) => (
        <UserCard {...feedUser} key={feedUser._id} />
      ))}
    </>
  );
};

export default FeedTemplate;

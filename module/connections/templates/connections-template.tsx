"use client";
import { ActionUserCard } from "@/module/requests/components/action-user-card";
import { useGetConnections } from "../hooks/useConnections";
import { CommonLoader } from "@/components/Common/Loader";
import DataEmptyHandler from "@/components/Common/CommonDataEmptyHandler";
import { IUser } from "@/module/auth/types";
import Script from "next/script";
import { useEffect, useState } from "react";

const ConnectionsTemplate = () => {
  const { data: response, isPending } = useGetConnections();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (isPending) {
    return <CommonLoader fullScreen={true} />;
  }
  return (
    <>
      {mounted && (
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      )}
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

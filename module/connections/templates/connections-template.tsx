"use client";
import { ActionUserCard } from "@/module/requests/components/action-user-card";
import { useGetConnections } from "../hooks/useConnections";
import { CommonLoader } from "@/components/common/Loader";
import DataEmptyHandler from "@/components/common/CommonDataEmptyHandler";
import { IUser } from "@/module/auth/types";
import Script from "next/script";
import { useEffect, useState } from "react";
import { usePagination } from "@/hooks/use-pagination";
import { CommonPagination } from "@/components/common/Pagination";
const ConnectionsTemplate = () => {
  const { page: currentPage, setPage } = usePagination();
  const { data: response, isPending } = useGetConnections({
    page: currentPage,
    limit: 4,
  });
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
      <div className="flex flex-col min-h-[calc(100vh-footerHeight)] border border-black">
        <div className="grow">
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
        </div>
        <div className="py-4 bg-white">
          <CommonPagination page={currentPage} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default ConnectionsTemplate;

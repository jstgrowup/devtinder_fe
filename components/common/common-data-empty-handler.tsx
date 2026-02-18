import React, { JSX } from "react";
import { CommonEmptyState } from "@/components/common/common-empty-state";

interface DataEmptyHandlerProps<T> {
  data?: T | T[];
  children: React.ReactNode;
  emptyMessage: string;
}

const DataEmptyHandler = <T,>({
  data,
  children,
  emptyMessage,
}: DataEmptyHandlerProps<T>): JSX.Element => {
  let hasData = false;

  if (Array.isArray(data)) {
    hasData = data.length > 0;
  } else if (data && typeof data === "object") {
    hasData = Object.keys(data).length > 0;
  } else {
    hasData = Boolean(data);
  }

  if (!hasData) {
    return <CommonEmptyState emptyMessage={emptyMessage} />;
  }

  return <>{children}</>;
};

export default DataEmptyHandler;

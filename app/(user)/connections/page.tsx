import ConnectionsTemplate from "@/module/connections/templates/connections-template";
import { Suspense } from "react";

const Connections = () => {
  return (
    <Suspense>
      <ConnectionsTemplate />;
    </Suspense>
  );
};

export default Connections;

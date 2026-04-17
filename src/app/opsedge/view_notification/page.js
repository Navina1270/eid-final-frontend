"use client";
import ViewNotification from "@/components/OpsEdge/ViewNotification/ViewNotification";
import { Suspense } from "react";
const Page = () => {
  return (
    <Suspense>
      <ViewNotification  />
    </Suspense>
  );
};

export default Page;

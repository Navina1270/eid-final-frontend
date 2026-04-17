"use client";
import ViewWorkOrder from "@/components/OpsEdge/ViewWorkOrder/ViewWorkOrder";
import { Suspense } from "react";

const Page = () => {
  return (
<Suspense>

  <ViewWorkOrder />
</Suspense>
  )
}

export default Page
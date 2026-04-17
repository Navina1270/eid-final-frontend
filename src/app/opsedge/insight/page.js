"use client";

import InsightParameters from "@/components/OpsEdge/AiveeSetup/InsightParameters";
// import dynamic from "next/dynamic";

// const InsightParameters = dynamic(
//   () => import("@/components/OpsEdge/AiveeSetup/InsightParameters"),
//   {
//     ssr: false,
//   }
// );
import { Suspense } from "react";
const Page = () => {

  return (
    <Suspense>
      <InsightParameters />
    </Suspense>
  );
};

export default Page


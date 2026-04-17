"use client";
import FlowDiagram from "@/components/OpsEdge/FlowDiagram/FlowDiagram";
import { Suspense } from "react";

const Page = () => {

  return (
    <Suspense>
      <FlowDiagram />
    </Suspense>
  );
}

export default Page
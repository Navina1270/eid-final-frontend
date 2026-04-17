"use client";

import ViewVisuals from "@/components/OpsEdge/ViewVisuals/ViewVisuals";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense>
      <ViewVisuals />
    </Suspense>
  );
};

export default page;

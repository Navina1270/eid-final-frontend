// "use client";
// import Grid from "@mui/material/Grid2";
// import DrawerComponent from "@/components/Common/DrawerComponent/DrawerComponent";
// import Neo4jGraph from "@/components/Neo4jGraph/Neo4jGraph";

// const page = () => {
//   return (
//     <Grid container spacing={2}>
//       <Grid size={{ xs: 12, md: 12 }}>
//         <DrawerComponent Children={<Neo4jGraph />} />
//       </Grid>
//     </Grid>
//     // <Neo4jGraph />
//   );
// };

// export default page;


"use client";
import Neo4jGraph from "@/components/OpsEdge/Neo4jGraph/Neo4jGraph";
import { Suspense } from "react";

const Page = () => {

  return (
    <Suspense>
      <Neo4jGraph />
    </Suspense>
  );
}

export default Page
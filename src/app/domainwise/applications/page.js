"use client";
import Applications from '@/components/DomainWise/Applications/Applications';
// import dynamic from "next/dynamic";

// const Applications = dynamic(
//   () => import("@/components/DomainWise/Applications/Applications"),
//   {
//     ssr: false,
//   }
// );
const page = () => {

  return (<>
  
      <Applications />
  </>
  )
}

export default page
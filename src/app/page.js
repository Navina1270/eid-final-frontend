// "use client";
import React from "react";
import { useAppContext } from "../context/AppContext";
import Welcome from "@/components/Common/Welcome/Welcome";


export default function page() {
  // const { user } = useAppContext();
  // You can use the user state here if needed
  // For example, you can check if the user is logged in and display different content
  // console.log("User in Form component:", user);

  return <Welcome />;
}

"use client";
import LeftDrawer from "@/components/OpsEdge/Common/LeftDrawer/LeftDrawer";
// const EXCLUDED_ROUTES = ["/opsedge/insight"];

export default function AdminLayout({ children }) {

  // const shouldHideDrawer = EXCLUDED_ROUTES.includes(pathname);
  return (
    // <>{shouldHideDrawer ? children : <LeftDrawer>{children}</LeftDrawer>}</>
         <LeftDrawer>{children}</LeftDrawer>

  );
}

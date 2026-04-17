"use client";
import LeftDrawer from "@/components/DomainWise/Common/LeftDrawer/LeftDrawer";
export default function AdminLayout({ children }) {
  return (<>
      <LeftDrawer>
        {children}
      </LeftDrawer>
    </>
  );
}

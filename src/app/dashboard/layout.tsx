import React from "react";

// component
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { IsAuth } from "@/components/IsAuth";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarProvider>
        <IsAuth />
        <AppSidebar />
        <main className="w-full pb-10">
          <SidebarTrigger className="text-primary hover:!text-primary mt-1 size-10 hover:!bg-transparent [&_svg:not([class*='size-'])]:size-6" />

          {children}
        </main>
      </SidebarProvider>
    </>
  );
}

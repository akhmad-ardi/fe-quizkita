import React from "react";

// component
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger className="text-primary hover:!text-primary mt-1 size-10 hover:!bg-transparent [&_svg:not([class*='size-'])]:size-6" />

          {children}
        </main>
      </SidebarProvider>
    </>
  );
}

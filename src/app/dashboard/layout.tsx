import React from "react";
import { redirect } from "next/navigation";

// component
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DeleteCookiesComponent } from "@/components/DeleteCookie";

// server
import { isAuth } from "@/server/is-auth";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { is_auth } = await isAuth();
  if (!is_auth) {
    return <DeleteCookiesComponent />;
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full pb-10">
          <SidebarTrigger className="text-primary hover:!text-primary mt-1 size-10 hover:!bg-transparent [&_svg:not([class*='size-'])]:size-6" />

          {children}
        </main>
      </SidebarProvider>
    </>
  );
}

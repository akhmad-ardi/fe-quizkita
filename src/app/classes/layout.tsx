import React from "react";

// component
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DeleteCookiesComponent } from "@/components/DeleteCookie";

// server
import { isAuth } from "@/server/is-auth";
import { GetCookies } from "@/server/get-cookies";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { is_auth } = await isAuth();
  if (!is_auth) {
    return <DeleteCookiesComponent />;
  }

  const { user } = await GetCookies();

  return (
    <>
      <SidebarProvider>
        <AppSidebar user={user} />
        <main className="w-full">
          <SidebarTrigger className="text-primary hover:!text-primary mt-1 size-10 hover:!bg-transparent [&_svg:not([class*='size-'])]:size-6" />

          {children}
        </main>
      </SidebarProvider>
    </>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building2, Power } from "lucide-react";

// component
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { FormSignOut } from "./FormSignOut";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader>
        <Image
          src="/QuizKita_logo.png"
          width={230}
          height={110}
          alt="QuizKita Logo"
          className="mx-auto h-[80px] w-[180px] rounded-lg object-cover transition-all duration-300"
          priority
        />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/dashboard"
                    className={
                      pathname === "/dashboard"
                        ? "bg-primary text-primary-foreground hover:!bg-primary/90 hover:!text-white"
                        : "hover:!bg-primary/90 hover:!text-white"
                    }
                  >
                    <Home /> Dashboard
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href="/classes"
                    className={
                      pathname === "/classes"
                        ? "bg-primary text-primary-foreground hover:!bg-primary/90 hover:!text-white"
                        : "hover:!bg-primary/90 hover:!text-white"
                    }
                  >
                    <Building2 /> Classes
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="m-0 p-0">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <AlertDialog>
                  <SidebarMenuButton asChild>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="hover:bg-destructive active:bg-destructive w-full justify-start hover:text-white active:text-white"
                        variant="destructive"
                        asChild
                      >
                        <Link href="#">
                          <Power /> Sign Out
                        </Link>
                      </Button>
                    </AlertDialogTrigger>
                  </SidebarMenuButton>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-destructive">
                        Sign Out
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure?
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <FormSignOut />
                  </AlertDialogContent>
                </AlertDialog>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

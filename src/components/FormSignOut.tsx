"use client";

import { useRouter } from "next/navigation";
import React from "react";

// component
import { DeleteCookies } from "@/server/delete-cookies";

import {
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

// server

export function FormSignOut() {
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await DeleteCookies();

    router.push("/auth/sign-in");

    setLoading(false);
  }

  return (
    <AlertDialogFooter>
      <AlertDialogCancel asChild>
        <Button
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive/80 active:bg-destructive justify-start border bg-white hover:text-white active:text-white"
          disabled={loading}
        >
          No
        </Button>
      </AlertDialogCancel>

      <form onSubmit={handleSubmit}>
        <AlertDialogAction asChild>
          <Button
            type="submit"
            className="bg-destructive hover:bg-destructive active:bg-destructive justify-start hover:text-white active:text-white"
            disabled={loading}
          >
            Yes
          </Button>
        </AlertDialogAction>
      </form>
    </AlertDialogFooter>
  );
}

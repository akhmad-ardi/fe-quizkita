"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

// component
import { Class } from "@/api/class";
import { GetCookies } from "@/server/get-cookies";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// API

// server

type Props = {
  classId: string;
};

export function FormDeleteClass({ classId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { token } = await GetCookies();

    const { status: deleteClassStatus, data: deleteClassRes } =
      await Class.DeleteClass(token?.value, classId);

    if (deleteClassStatus >= 400) {
      setLoading(false);
      return toast.error(deleteClassRes.message, { position: "top-center" });
    }

    router.push("/classes");
    setLoading(false);
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Class</AlertDialogTitle>
          <AlertDialogDescription>Are you sure?</AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button
                variant="destructive"
                className="text-destructive hover:bg-destructive border-destructive border bg-white hover:text-white"
                disabled={loading}
              >
                Cancel
              </Button>
            </AlertDialogCancel>

            <Button
              type="submit"
              variant="destructive"
              className="border-destructive !bg-destructive hover:!bg-destructive/90 border text-white"
              disabled={loading}
            >
              <Trash /> Delete
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}

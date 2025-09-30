"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { toast } from "sonner";

// component
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

// API
import { Material } from "@/api/material";

// server
import { GetCookies } from "@/server/get-cookies";

type Props = {
  classId: string;
  materialId: string;
  title: string;
};

export function FormDeleteMaterial({ classId, materialId, title }: Props) {
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { token } = await GetCookies();

    const { status: deleteMaterialStatus, data: deleteMaterialRes } =
      await Material.DeleteMaterial(token?.value, materialId);

    if (deleteMaterialStatus >= 400) {
      setLoading(false);
      return toast.error(deleteMaterialRes.message, { position: "top-center" });
    }

    router.push(`/classes/${classId}`);
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
          <AlertDialogTitle>Delete {title}</AlertDialogTitle>
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

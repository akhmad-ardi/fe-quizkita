"use client";

import React from "react";
import { Share } from "lucide-react";
import { toast } from "sonner";

// component
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  classId: string;
};

export function ShareClass({ classId }: Props) {
  async function handleCopy(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    try {
      await navigator.clipboard.writeText(classId);
      toast.success("Class code copied to clipboard!", {
        position: "top-center",
      });
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy class code", { position: "top-center" });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Share />
          Share Class
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share Class</AlertDialogTitle>
          <AlertDialogDescription>
            Share class for other user
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button className="text-destructive hover:bg-destructive border-destructive border bg-white hover:text-white">
              Cancel
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button onClick={(e) => handleCopy(e)}>
              <Share /> Copy Class Code
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

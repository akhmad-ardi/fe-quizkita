"use client";

import { HousePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import { Class } from "@/api/class";
import { GetCookies } from "@/server/get-cookies";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormJoinClass() {
  const router = useRouter();

  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [classCode, setClassCode] = React.useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { token } = await GetCookies();

    const { status: joinClassStatus, data: joinClassRes } =
      await Class.JoinClass(token?.value, {
        invite_code: classCode,
      });

    if (joinClassStatus === 400) {
      setLoading(false);
      return toast.error(joinClassRes.messages.invite_code, {
        position: "top-center",
      });
    }

    if (joinClassStatus > 400) {
      setLoading(false);
      return toast.error(joinClassRes.message, {
        position: "top-center",
      });
    }

    toast.success(joinClassRes.message, { position: "top-center" });

    setLoading(false);
    setClassCode("");
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <HousePlus />
          Join Class
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Class</DialogTitle>
          <DialogDescription>Join class</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label htmlFor="class_code" className="mb-2">
              Class Code
            </Label>
            <Input
              type="text"
              id="class_code"
              placeholder="Class Code"
              onChange={(e) => setClassCode(e.target.value)}
              value={classCode}
              disabled={loading}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="text-destructive border-destructive hover:bg-destructive border bg-white hover:text-white"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              <HousePlus /> Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

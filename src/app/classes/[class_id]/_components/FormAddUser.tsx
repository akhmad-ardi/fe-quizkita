"use client";

import { UserPlus } from "lucide-react";
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

type Props = {
  classId: string;
};

export function FormAddUser({ classId }: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { token } = await GetCookies();

    const { status: addUserToClassStatus, data: addUserToClassRes } =
      await Class.AddUserToClass(token?.value, { classId, username });

    if (addUserToClassStatus === 400) {
      setLoading(false);
      return Object.values(addUserToClassRes.messages).forEach((msg) => {
        if (msg) {
          toast.error(msg, { position: "top-center" });
        }
      });
    }

    if (addUserToClassStatus > 400) {
      setLoading(false);
      return toast.error(addUserToClassRes.message, { position: "top-center" });
    }

    toast.success(addUserToClassRes.message, { position: "top-center" });
    setOpen(false);
    setLoading(false);
    setUsername("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus />
          Add User
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>Adding a user to class</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label htmlFor="username" className="mb-2">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              disabled={loading}
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="text-destructive border-destructive hover:bg-destructive border bg-white hover:text-white"
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              <UserPlus />
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

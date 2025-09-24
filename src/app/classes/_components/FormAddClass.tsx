"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

// component
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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

// API
import { Class } from "@/api/class";

// server
import { GetCookies } from "@/server/get-cookies";

export function FormAddClass() {
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const { token } = await GetCookies();

      const { status, data } = await Class.AddClass(token?.value as string, {
        name,
      });

      if (status === 400) {
        return toast.error(data.messages.name, { position: "top-center" });
      }

      if (status !== 201) {
        return toast.error(data.message, { position: "top-center" });
      }

      toast.success(data.message, { position: "top-center" });

      setDialogOpen(false);
      setName("");

      router.refresh();
    } catch (err) {
      console.error("ERROR di handleSubmit:", err);
      toast.error("Unexpected error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex cursor-pointer items-center gap-2"
          onClick={() => setDialogOpen(true)}
        >
          <Plus />
          <span>Add Class</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Class</DialogTitle>
          <DialogDescription>Add new class</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Label htmlFor="name" className="mb-2">
              Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Class Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              disabled={loading}
              required
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="border-destructive text-destructive border bg-white hover:text-white"
                disabled={loading}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

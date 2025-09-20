"use client";

import React from "react";
import { UserPlus } from "lucide-react";

// component
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";

export function FormAddUser() {
  return (
    <>
      <form>
        <div className="mb-3">
          <Label htmlFor="username" className="mb-2">
            Username
          </Label>
          <Input type="text" id="username" placeholder="Username" />
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

          <Button type="submit">
            <UserPlus />
            Add
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}

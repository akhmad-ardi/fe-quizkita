"use client";

import React from "react";
import { HousePlus } from "lucide-react";

// component
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";

export function FormJoinClass() {
  return (
    <form>
      <div className="mb-3">
        <Label htmlFor="class_code" className="mb-2">
          Class Code
        </Label>
        <Input type="text" id="class_code" placeholder="Class Code" />
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
          <HousePlus /> Add
        </Button>
      </DialogFooter>
    </form>
  );
}

"use client";

// component
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function FormAddClass() {
  return (
    <form>
      <div className="mb-3">
        <Label htmlFor="name" className="mb-2">
          Name
        </Label>
        <Input type="text" placeholder="Class Name" />
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button
            variant="destructive"
            className="border-destructive text-destructive border bg-white hover:text-white"
          >
            Cancel
          </Button>
        </DialogClose>

        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  );
}

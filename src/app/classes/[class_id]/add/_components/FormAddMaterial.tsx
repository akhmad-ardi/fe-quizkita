"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// component
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function FormAddMaterial() {
  return (
    <form>
      <div className="mb-3">
        <Label htmlFor="title" className="mb-2">
          Title
        </Label>
        <Input type="text" id="title" placeholder="Material Title" />
      </div>

      <div className="mb-3">
        <Label htmlFor="material" className="mb-2">
          Material
        </Label>
        <Textarea id="material" rows={10} placeholder="Material Content" />
      </div>

      <div className="mb-3 flex justify-end gap-2">
        <Button
          type="button"
          variant="destructive"
          className="text-destructive hover:bg-destructive/90 border-destructive border bg-white hover:text-white"
          asChild
        >
          <Link href={`/classes/1`}>
            <ArrowLeft /> Back
          </Link>
        </Button>

        <Button type="submit">Generate Quiz</Button>
      </div>
    </form>
  );
}

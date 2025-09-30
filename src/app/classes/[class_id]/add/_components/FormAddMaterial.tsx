"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

// component
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// API
import { Material } from "@/api/material";

// server
import { GetCookies } from "@/server/get-cookies";

type Props = {
  class_id: string;
};

export function FormAddMaterial({ class_id }: Props) {
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [titleError, setTitleError] = React.useState<string>("");
  const [content, setContent] = React.useState<string>("");
  const [contentError, setContentError] = React.useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const { token } = await GetCookies();

    const { status: addMaterialStatus, data: addMaterialRes } =
      await Material.AddMaterial(token?.value, {
        class_id,
        title,
        content,
      });

    if (addMaterialStatus === 400) {
      if (addMaterialRes.messages?.class_id) {
        toast.error(addMaterialRes.messages.class_id, {
          position: "top-center",
        });

        return setLoading(false);
      }

      setTitleError(addMaterialRes.messages?.title ?? "");
      setContentError(addMaterialRes.messages?.content ?? "");

      return setLoading(false);
    }

    if (addMaterialStatus > 400) {
      toast.error(addMaterialRes.message, {
        position: "top-center",
      });

      return setLoading(false);
    }

    router.push(`/classes/${class_id}`);
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <Label htmlFor="title" className="mb-2">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          placeholder="Material Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          disabled={loading}
          required
        />
        {titleError ? (
          <p className="text-destructive ms-2 mt-1 text-sm">*{titleError}</p>
        ) : null}
      </div>

      <div className="mb-3">
        <Label htmlFor="material" className="mb-2">
          Material
        </Label>
        <Textarea
          id="material"
          rows={10}
          placeholder="Material Content"
          onChange={(e) => setContent(e.target.value)}
          value={content}
          disabled={loading}
          required
        />
        {contentError ? (
          <p className="text-destructive ms-2 mt-1 text-sm">*{contentError}</p>
        ) : null}
      </div>

      <div className="mb-3 flex justify-end gap-2">
        <Button
          type="button"
          variant="destructive"
          className="text-destructive hover:bg-destructive/90 border-destructive border bg-white hover:text-white"
          onClick={() => router.push(`/classes/${class_id}`)}
          disabled={loading}
        >
          <ArrowLeft /> Back
        </Button>

        <Button type="submit" disabled={loading}>
          Generate Quiz
        </Button>
      </div>
    </form>
  );
}

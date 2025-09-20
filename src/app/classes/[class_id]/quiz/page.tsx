import React from "react";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{
    class_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { class_id } = await params;

  return redirect(`/classes/${class_id}`);
}

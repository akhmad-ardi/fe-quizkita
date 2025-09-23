import React from "react";

// server
import { isGuest } from "@/server/is-guest";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await isGuest();

  return <>{children}</>;
}

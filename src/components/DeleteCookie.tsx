"use client";

import React from "react";

// server
import { DeleteCookies } from "@/server/delete-cookies";

export function DeleteCookiesComponent() {
  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await DeleteCookies();
      } catch (err) {
        console.error("isAuth error:", err);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return <></>;
}

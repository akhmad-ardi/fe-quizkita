"use client";

import React from "react";

// server
import { isAuth } from "@/server/is-auth";

export function IsAuth() {
  React.useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        await isAuth();
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

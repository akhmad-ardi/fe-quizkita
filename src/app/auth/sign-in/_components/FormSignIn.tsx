"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";

// component
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// API
import { Auth } from "@/api/auth";
import { SetCookies } from "@/server/set-cookies";

export function FormSignIn() {
  const router = useRouter();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    const { status, data } = await Auth.SignIn({ username, password });

    if (status === 400) {
      setLoading(false);
      return toast.error(data.message, { position: "top-center" });
    }

    await SetCookies({
      accessToken: data.data?.accessToken as string,
      refreshToken: data.data?.refreshToken as string,
    });

    setLoading(false);

    router.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <Label className="mb-2">Username</Label>
        <Input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          disabled={loading}
          required
        />
      </div>

      <div className="mb-3">
        <Label className="mb-2">Password</Label>
        <div className="flex w-full max-w-md items-center gap-2">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={loading}
            required
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPassword(!showPassword)}
            disabled={loading}
          >
            {showPassword ? <EyeClosed /> : <Eye />}
          </Button>
        </div>
      </div>

      <div className="mb-3">
        <Button type="submit" className="w-full" disabled={loading}>
          Sign In
        </Button>
      </div>
    </form>
  );
}

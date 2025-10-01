"use client";

import { Eye, EyeClosed } from "lucide-react";
import React from "react";
import { toast } from "sonner";

import { Auth } from "@/api/auth";
import { User } from "@/api/user";
import { SetCookies } from "@/server/set-cookies";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FormSignIn() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    const { status: signInStatus, data: signInRes } = await Auth.SignIn({
      username,
      password,
    });

    if (signInStatus >= 400) {
      setLoading(false);
      return toast.error(signInRes.message, { position: "top-center" });
    }

    const token = signInRes.data?.token;

    const { status: getUserStatus, data: getUserRes } =
      await User.GetUser(token);

    if (getUserStatus !== 200) {
      setLoading(false);
      return toast.error(getUserRes.message, { position: "top-center" });
    }

    setLoading(false);
    await SetCookies({ token, user: getUserRes.data.user });
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

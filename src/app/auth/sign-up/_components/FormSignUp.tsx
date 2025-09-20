"use client";

import React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";

// component
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// API
import { Auth } from "@/api/auth";

export function FormSignUp() {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [fullname, setFullname] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    e.preventDefault();

    const { status, data } = await Auth.SignUp({
      username,
      fullname,
      password,
      confirm_password: confirmPassword,
    });

    if (status === 400 && data.messages) {
      setLoading(false);
      return Object.values(data.messages).forEach((msg) => {
        if (msg) {
          toast.error(msg, { position: "top-center" });
        }
      });
    }

    if (status === 409) {
      setLoading(false);
      return toast.error(data.message, { position: "top-center" });
    }

    setLoading(false);
    return toast.success(data.message, { position: "top-center" });
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
          required
          disabled={loading}
        />
      </div>

      <div className="mb-3">
        <Label className="mb-2">Fullname</Label>
        <Input
          type="text"
          placeholder="Fullname"
          onChange={(e) => setFullname(e.target.value)}
          value={fullname}
          required
          disabled={loading}
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
            required
            disabled={loading}
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
        <Label className="mb-2">Confirm Password</Label>
        <div className="flex w-full max-w-md items-center gap-2">
          <Input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            disabled={loading}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={loading}
          >
            {showConfirmPassword ? <EyeClosed /> : <Eye />}
          </Button>
        </div>
      </div>

      <div className="mb-3">
        <Button type="submit" className="w-full" disabled={loading}>
          Sign Up
        </Button>
      </div>
    </form>
  );
}

"use client";

import React from "react";
import { Eye, EyeClosed } from "lucide-react";

// component
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function FormSignUp() {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    React.useState<boolean>(false);

  return (
    <form>
      <div className="mb-3">
        <Label className="mb-2">Username</Label>
        <Input type="text" placeholder="Username" />
      </div>

      <div className="mb-3">
        <Label className="mb-2">Fullname</Label>
        <Input type="text" placeholder="Fullname" />
      </div>

      <div className="mb-3">
        <Label className="mb-2">Password</Label>
        <div className="flex w-full max-w-md items-center gap-2">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPassword(!showPassword)}
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
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeClosed /> : <Eye />}
          </Button>
        </div>
      </div>

      <div className="mb-3">
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </div>
    </form>
  );
}

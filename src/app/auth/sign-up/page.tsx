import React from "react";
import Image from "next/image";
import Link from "next/link";

// component
import { FormSignUp } from "./_components/FormSignUp";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function page() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-11/12 md:w-1/3">
        <CardHeader>
          <Image
            src="/QuizKita_logo.png"
            width={230}
            height={110}
            alt="QuizKita Logo"
            className="mx-auto h-[80px] w-[180px] rounded-lg object-cover transition-all duration-300"
            priority
          />

          <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
        </CardHeader>

        <CardContent>
          <FormSignUp />
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-center">
            Please{" "}
            <Button variant="link" className="px-1 py-0" asChild>
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>{" "}
            if you have Account
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

import React from "react";
import Link from "next/link";
import { Plus, HousePlus } from "lucide-react";

// component
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FormAddClass } from "./_components/FormAddClass";
import { FormJoinClass } from "./_components/FormJoinClass";

export default function page() {
  return (
    <>
      <section className="container mb-10 px-10">
        <h1 className="my-5 text-center text-4xl font-bold">- Classes -</h1>

        <div className="mb-5">
          <Card className="border-primary bg-primary/10 border">
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <HousePlus />
                    Join Class
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join Class</DialogTitle>
                    <DialogDescription>Join class</DialogDescription>
                  </DialogHeader>

                  <FormJoinClass />
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link href="/classes/1">
            <Card className="border-primary w-full cursor-pointer gap-2 transition hover:shadow-lg">
              <CardHeader className="mb-0">
                <CardTitle className="m-0 text-xl font-semibold">
                  Class Names
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="text-md font-normal">
                  Total Quiz: <span className="font-extrabold">5</span>
                </h4>
              </CardContent>
            </Card>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="border-primary relative w-full cursor-pointer gap-2 transition hover:shadow-lg">
                <CardContent className="flex h-full items-center justify-center">
                  <Button className="flex cursor-pointer items-center gap-2">
                    <Plus />
                    <span>Add Class</span>
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Class</DialogTitle>
                <DialogDescription>Add new class</DialogDescription>
              </DialogHeader>

              <FormAddClass />
            </DialogContent>
          </Dialog>
        </div>

        <div className="mt-5 text-center"></div>
      </section>
    </>
  );
}

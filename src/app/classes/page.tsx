import React from "react";
import Link from "next/link";
import { HousePlus } from "lucide-react";

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

// API
import { Class } from "@/api/class";

// server
import { GetCookies } from "@/server/get-cookies";

export default async function page() {
  const { token } = await GetCookies();

  const { status: getClassesStatus, data: getClassesRes } =
    await Class.GetClasses(token?.value as string);

  return (
    <>
      <section className="container mb-10 px-10">
        <h1 className="my-5 text-center text-4xl font-bold">- Classes -</h1>

        <div className="mb-5">
          <Card className="border-primary bg-primary/10 border">
            <CardFooter className="gap-2">
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

              <FormAddClass />
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {getClassesStatus === 200 ? (
            getClassesRes.data.classes.map((_class) => (
              <Link href={`/classes/${_class.id}`} key={_class.id}>
                <Card className="border-primary w-full cursor-pointer gap-2 transition hover:shadow-lg">
                  <CardHeader className="mb-0">
                    <CardTitle className="m-0 text-xl font-semibold">
                      {_class.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-md font-normal">
                      Total Quiz:{" "}
                      <span className="font-extrabold">
                        {_class.total_quiz}
                      </span>
                    </h4>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <></>
          )}
        </div>

        <div className="mt-5 text-center"></div>
      </section>
    </>
  );
}

import { ArrowLeft, Info, Pencil, FileCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

// component
import { Material } from "@/api/material";
import { Quiz } from "@/api/quiz";
import { GetCookies } from "@/server/get-cookies";

import { Button } from "@/components/ui/button";
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
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

import { FormDeleteMaterial } from "./_components/FormDeleteMaterial";

// API

// server

type Props = {
  params: Promise<{
    class_id: string;
    material_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { class_id, material_id } = await params;

  const { token, user } = await GetCookies();

  const { status: getMaterialStatus, data: getMaterialRes } =
    await Material.GetMaterial(token?.value, material_id);

  if (getMaterialStatus >= 400) {
    return redirect(`/classes/${class_id}`);
  }

  const { data: getQuizUserResultRes } = await Quiz.GetQuizUserResult(
    token?.value,
    material_id
  );

  return (
    <>
      <section className="container mb-10 px-5 md:px-10">
        <h1 className="my-5 text-center text-4xl font-bold">
          - {getMaterialRes.data.title} -
        </h1>

        <div className="mx-auto mb-3 md:w-2/3">
          <Card className="border-primary bg-primary/10 border">
            <CardFooter className="justify-between gap-2">
              <Button
                variant="destructive"
                className="text-destructive hover:bg-destructive border-destructive border bg-white hover:text-white"
                asChild
              >
                <Link href={`/classes/${class_id}`}>
                  <ArrowLeft />
                  Back
                </Link>
              </Button>

              <div className="flex gap-3">
                {/* Delete Material */}
                {getMaterialRes.data.user_id === user.id ? (
                  <FormDeleteMaterial
                    classId={class_id}
                    materialId={getMaterialRes.data.material_id}
                    title={getMaterialRes.data.title}
                  />
                ) : null}

                {getQuizUserResultRes.data ? (
                  // view result
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <FileCheck />
                        Result
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-center text-3xl font-normal">
                          Score
                        </DialogTitle>

                        <div className="my-8 text-center">
                          <span className="rounded-full border border-black p-5 text-center text-5xl font-bold">
                            {getQuizUserResultRes.data.score}
                          </span>
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                ) : (
                  // take the quiz
                  <Button asChild>
                    <Link href={`/classes/${class_id}/quiz/${material_id}`}>
                      <Pencil /> Take the Quiz
                    </Link>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="mx-auto md:w-2/3">
          <Card className="border-primary border">
            <CardContent>
              <h3 className="text-start text-xl font-bold">
                {getMaterialRes.data.title}
              </h3>

              <p>{getMaterialRes.data.content}</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

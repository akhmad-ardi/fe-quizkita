import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Info, Pencil } from "lucide-react";

// component
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { FormDeleteMaterial } from "./_components/FormDeleteMaterial";

// API
import { Material } from "@/api/material";

// server
import { GetCookies } from "@/server/get-cookies";

type Props = {
  params: Promise<{
    class_id: string;
    material_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { class_id, material_id } = await params;

  const { token } = await GetCookies();

  const { status: getMaterialStatus, data: getMaterialRes } =
    await Material.GetMaterial(token?.value, material_id);

  if (getMaterialStatus >= 400) {
    return redirect(`/classes/${class_id}`);
  }

  const Questions = getMaterialRes.data.questions;

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
                <Link href={"/classes/1"}>
                  <ArrowLeft />
                  Back
                </Link>
              </Button>

              <div className="flex gap-3">
                {/* Delete Material */}
                <FormDeleteMaterial
                  classId={class_id}
                  materialId={getMaterialRes.data.material_id}
                  title={getMaterialRes.data.title}
                />

                {/* View Quiz */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="border-primary text-primary hover:bg-primary cursor-pointer border bg-white hover:text-white">
                      <Info /> View Quiz
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="h-fit min-w-3/4">
                    <DialogHeader>
                      <DialogTitle>Questions</DialogTitle>
                      <DialogDescription>Preview Questions</DialogDescription>
                    </DialogHeader>

                    <ScrollArea className="border-primary h-96 w-full rounded-xl border p-5">
                      <div className="flex flex-col gap-2">
                        {Questions.map((question, indexQ) => (
                          <Card
                            className="border-primary bg-primary/10 gap-0 border"
                            key={indexQ}
                          >
                            <CardHeader>
                              <CardTitle className="text-2xl">
                                {indexQ + 1}.
                              </CardTitle>
                            </CardHeader>

                            <CardContent>{question.question_text}</CardContent>

                            <CardFooter className="mt-5">
                              <RadioGroup>
                                {question.Answers.map((answer, indexA) => (
                                  <div
                                    className="flex items-center space-x-2"
                                    key={indexA}
                                  >
                                    <RadioGroupItem
                                      value={answer.id}
                                      id={`${indexQ}-option-${indexA}`}
                                      className="border-primary border"
                                      disabled
                                    />
                                    <Label
                                      htmlFor={`${indexQ}-option-${indexA}`}
                                      className="text-md font-normal"
                                    >
                                      {answer.answer_text}
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="border-primary text-primary border bg-white hover:text-white">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button asChild>
                  <Link href={`/classes/${class_id}/quiz/${material_id}`}>
                    <Pencil /> Take the Quiz
                  </Link>
                </Button>
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

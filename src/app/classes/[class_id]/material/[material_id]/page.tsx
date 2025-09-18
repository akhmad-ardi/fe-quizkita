import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

type Props = {
  params: Promise<{
    class_id: string;
    material_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { class_id, material_id } = await params;

  const Questions = [
    {
      question_text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem qui minus optio illum deleniti eveniet excepturi placeat laudantium esse voluptatum?",
      answers: ["A", "B", "C", "D"],
    },
    {
      question_text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem qui minus optio illum deleniti eveniet excepturi placeat laudantium esse voluptatum?",
      answers: ["A", "B", "C", "D"],
    },
    {
      question_text:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem qui minus optio illum deleniti eveniet excepturi placeat laudantium esse voluptatum?",
      answers: ["A", "B", "C", "D"],
    },
  ];

  return (
    <>
      <section className="container mb-10 px-5 md:px-10">
        <h1 className="my-5 text-center text-4xl font-bold">
          - Detail Material {material_id} -
        </h1>

        <div className="mx-auto md:w-2/3">
          <Card>
            <CardContent>
              <h3 className="text-start text-xl font-bold">Material</h3>

              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit expedita porro voluptates accusamus, qui labore? Modi
                neque corrupti, dolore libero vero eligendi a adipisci. Ea sed
                temporibus, fuga repellat delectus rerum, facere, qui quam
                maxime cupiditate iure! Optio harum blanditiis accusantium autem
                id eligendi officiis vero repudiandae, nisi quo assumenda at
                modi quod officia nobis culpa hic laboriosam commodi! Iusto quos
                excepturi doloremque veniam optio, consequatur reprehenderit quo
                minima nostrum labore, est similique ratione aperiam vero
                voluptates dignissimos omnis dicta voluptatem atque, iste
                possimus. Rem, possimus quo voluptate tempore mollitia quas eum
                labore reprehenderit a. Deserunt libero quis at deleniti.
              </p>
            </CardContent>

            <CardFooter className="justify-end gap-2">
              <Button asChild>
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
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="border-primary text-primary hover:bg-primary cursor-pointer border bg-white hover:text-white">
                    View Quiz
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
                              {question.answers.map((answer, indexA) => (
                                <div
                                  className="flex items-center space-x-2"
                                  key={indexA}
                                >
                                  <RadioGroupItem
                                    value={answer}
                                    id={`${indexQ}-option-${indexA}`}
                                    className="border-primary border"
                                  />
                                  <Label
                                    htmlFor={`${indexQ}-option-${indexA}`}
                                    className="text-md font-normal"
                                  >
                                    {answer}
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
                  Take the Quiz
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}

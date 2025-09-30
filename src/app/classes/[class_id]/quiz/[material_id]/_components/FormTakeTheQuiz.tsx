"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

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
import { Button } from "@/components/ui/button";

// API
import { Quiz } from "@/api/quiz";

// server
import { GetCookies } from "@/server/get-cookies";

// lib
import { Feedback, Questions } from "@/lib/types";

type Props = {
  class_id: string;
  material_id: string;
  questions: Array<Questions>;
};

export function FormTakeTheQuiz({ class_id, material_id, questions }: Props) {
  const router = useRouter();

  const [open, setOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [feedback, setFeedback] = React.useState<Array<Feedback>>([]);
  const [answers, setAnswers] = React.useState<{
    [questionId: string]: string;
  }>({});

  function handleChange(questionId: string, answerId: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const dataAnswers = {
      answers: Object.entries(answers).map(([question_id, answer_id]) => ({
        question_id,
        answer_id,
      })),
    };

    const { token } = await GetCookies();

    const { status: submitAnswerStatus, data: submitAnswerRes } =
      await Quiz.SubmitAnswer(token?.value, material_id, dataAnswers);

    if (submitAnswerStatus !== 201) {
      setLoading(false);
      return toast.error(
        submitAnswerRes.message || submitAnswerRes.messages?.answers,
        { position: "top-center" }
      );
    }

    toast.success(submitAnswerRes.data?.score, { position: "top-center" });
    setOpen(true);
    setFeedback(submitAnswerRes.data?.feedback as Array<Feedback>);
    setLoading(false);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-fit min-w-3/4">
          <DialogHeader>
            <DialogTitle>Questions</DialogTitle>
            <DialogDescription>Preview Questions</DialogDescription>
          </DialogHeader>

          <ScrollArea className="border-primary h-96 w-full rounded-xl border p-5">
            <div className="flex flex-col gap-2">
              {feedback.map((fb, indexQ) => (
                <Card
                  className="border-primary bg-primary/10 gap-0 border"
                  key={indexQ}
                >
                  <CardHeader>
                    <CardTitle className="text-2xl">{indexQ + 1}.</CardTitle>
                  </CardHeader>

                  <CardContent>{fb.question_text}</CardContent>

                  <CardFooter className="mt-5"></CardFooter>
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

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {questions.map((question, indexQ) => (
          <Card
            className="border-primary bg-primary/10 gap-0 border"
            key={question.id}
          >
            <CardHeader>
              <CardTitle className="text-2xl">{indexQ + 1}.</CardTitle>
            </CardHeader>

            <CardContent>{question.question_text}</CardContent>

            <CardFooter className="mt-5">
              <RadioGroup
                onValueChange={(val) => handleChange(question.id, val)}
              >
                {question.Answers.map((answer, indexA) => (
                  <div className="flex items-center space-x-2" key={indexA}>
                    <RadioGroupItem
                      value={answer.id}
                      id={`${answer.id}`}
                      className="border-primary border"
                      disabled={loading}
                    />
                    <Label
                      htmlFor={`${answer.id}`}
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

        <Card className="border-primary bg-primary/10 gap-0 border">
          <CardContent className="flex justify-end gap-2">
            <Button
              variant="destructive"
              className="text-destructive hover:bg-destructive border-destructive border bg-white hover:text-white"
              onClick={() =>
                router.push(`/classes/${class_id}/material/${material_id}`)
              }
              disabled={loading}
            >
              <ArrowLeft />
              Back
            </Button>

            <Button type="submit" disabled={loading}>
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </>
  );
}

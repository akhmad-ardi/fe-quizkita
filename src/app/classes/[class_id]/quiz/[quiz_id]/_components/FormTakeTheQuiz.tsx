"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// component
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export function FormTakeTheQuiz() {
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
    <form className="flex flex-col gap-3">
      {Questions.map((question, indexQ) => (
        <Card
          className="border-primary bg-primary/10 gap-0 border"
          key={indexQ}
        >
          <CardHeader>
            <CardTitle className="text-2xl">{indexQ + 1}.</CardTitle>
          </CardHeader>

          <CardContent>{question.question_text}</CardContent>

          <CardFooter className="mt-5">
            <RadioGroup>
              {question.answers.map((answer, indexA) => (
                <div className="flex items-center space-x-2" key={indexA}>
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

      <Card className="border-primary bg-primary/10 gap-0 border">
        <CardContent className="flex justify-end gap-2">
          <Button
            variant="destructive"
            className="text-destructive hover:bg-destructive border-destructive border bg-white hover:text-white"
            asChild
          >
            <Link href={"/classes/1/material/1"}>
              <ArrowLeft />
              Back
            </Link>
          </Button>

          <Button type="submit">Submit</Button>
        </CardContent>
      </Card>
    </form>
  );
}

import React from "react";

// component
import { FormTakeTheQuiz } from "./_components/FormTakeTheQuiz";

type Props = {
  params: Promise<{
    quiz_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { quiz_id } = await params;

  return (
    <>
      <section className="container mb-10 px-5 md:px-10">
        <h1 className="my-5 text-center text-4xl font-bold">
          - Take the Quiz {quiz_id} -
        </h1>

        <div className="mx-auto mt-3 w-11/12 md:w-2/3">
          <FormTakeTheQuiz />
        </div>
      </section>
    </>
  );
}

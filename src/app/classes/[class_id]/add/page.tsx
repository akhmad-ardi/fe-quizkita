import React from "react";

// component
import { FormAddMaterial } from "./_components/FormAddMaterial";

type Props = {
  params: Promise<{
    class_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { class_id } = await params;

  return (
    <>
      <section className="container mb-10 px-5 md:px-10">
        <h1 className="my-5 text-center text-4xl font-bold">
          - Add Material -
        </h1>

        <div className="mx-auto md:w-2/3">
          <FormAddMaterial class_id={class_id} />
        </div>
      </section>
    </>
  );
}

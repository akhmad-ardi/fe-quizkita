import { redirect } from "next/navigation";
import React from "react";

import { Material } from "@/api/material";
import { GetCookies } from "@/server/get-cookies";

import { FormTakeTheQuiz } from "./_components/FormTakeTheQuiz";

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

  if (getMaterialStatus > 400) {
    return redirect(`/classes/${class_id}/material/${material_id}`);
  }

  return (
    <>
      <section className="container mb-10 px-5 md:px-10">
        <h1 className="my-5 text-center text-4xl font-bold">
          - {getMaterialRes.data.title} -
        </h1>

        <div className="mx-auto mt-3 w-11/12 md:w-2/3">
          <FormTakeTheQuiz
            class_id={class_id}
            material_id={material_id}
            questions={getMaterialRes.data.questions}
          />
        </div>
      </section>
    </>
  );
}

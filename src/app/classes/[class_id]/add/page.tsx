import React from "react";

// component
import { FormAddMaterial } from "./_components/FormAddMaterial";

export default function page() {
  return (
    <>
      <section className="container mb-10 px-5 md:px-10">
        <h1 className="my-5 text-center text-4xl font-bold">
          - Add Material -
        </h1>

        <div className="mx-auto md:w-2/3">
          <FormAddMaterial />
        </div>
      </section>
    </>
  );
}

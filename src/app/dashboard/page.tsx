import Link from "next/link";
import React from "react";

import { Class } from "@/api/class";
import { GetCookies } from "@/server/get-cookies";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function page() {
  const { token } = await GetCookies();

  const { data: getClassesRes } = await Class.GetClasses(token?.value);

  return (
    <>
      <section className="container mb-10 px-10">
        <h1 className="my-5 text-center text-4xl font-bold">- Dashboard -</h1>

        <div className="flex flex-col gap-3 md:flex-row">
          <Card className="border-primary w-full gap-2">
            <CardHeader className="mb-0">
              <CardTitle className="m-0 font-semibold">Total Classes</CardTitle>
            </CardHeader>

            <CardContent>
              <h4 className="text-3xl font-extrabold">
                {getClassesRes.data.classes.length}
              </h4>
            </CardContent>
          </Card>

          <Card className="border-primary w-full gap-2">
            <CardHeader className="mb-0">
              <CardTitle className="m-0 font-semibold">Total Quiz</CardTitle>
            </CardHeader>

            <CardContent>
              <h4 className="text-3xl font-extrabold">
                {getClassesRes.data.classes.reduce(
                  (acc, _class) => acc + _class.total_quiz,
                  0
                )}
              </h4>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-10">
        <h1 className="my-5 text-center text-4xl font-bold">- Classes -</h1>

        {getClassesRes.data.classes.length < 3 ? (
          // kalau 1 atau 2 card → center
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            {getClassesRes.data.classes.map((cls) => (
              <Card
                key={cls.id}
                className="border-primary relative w-1/3 max-w-lg cursor-pointer gap-2 transition hover:shadow-lg"
              >
                <Link
                  href={`/classes/${cls.id}`}
                  className="absolute inset-0 z-10"
                ></Link>

                <CardHeader className="relative z-20 mb-0">
                  <CardTitle className="m-0 text-xl font-semibold">
                    {cls.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-20">
                  <h4 className="text-md font-normal">
                    Total Quiz:{" "}
                    <span className="font-extrabold">{cls.total_quiz}</span>
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // kalau 3 atau lebih card → grid
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {getClassesRes.data.classes.map((cls) => (
              <Card
                key={cls.id}
                className="border-primary relative w-full max-w-lg cursor-pointer gap-2 transition hover:shadow-lg"
              >
                <Link
                  href={`/classes/${cls.id}`}
                  className="absolute inset-0 z-10"
                ></Link>

                <CardHeader className="relative z-20 mb-0">
                  <CardTitle className="m-0 text-xl font-semibold">
                    {cls.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-20">
                  <h4 className="text-md font-normal">
                    Total Quiz:{" "}
                    <span className="font-extrabold">{cls.total_quiz}</span>
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-5 text-center">
          <Button asChild>
            <Link href="/classes">View More</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

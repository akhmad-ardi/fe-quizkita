import React from "react";
import Link from "next/link";

// component
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function page() {
  const CLASSES = [
    {
      id: "1",
      name: "satu",
      totalQuiz: 5,
    },
    {
      id: "2",
      name: "dua",
      totalQuiz: 10,
    },
    {
      id: "3",
      name: "tiga",
      totalQuiz: 15,
    },
  ];

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
              <h4 className="text-3xl font-extrabold">5</h4>
            </CardContent>
          </Card>

          <Card className="border-primary w-full gap-2">
            <CardHeader className="mb-0">
              <CardTitle className="m-0 font-semibold">Total Quiz</CardTitle>
            </CardHeader>

            <CardContent>
              <h4 className="text-3xl font-extrabold">20</h4>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="px-10">
        <h1 className="my-5 text-center text-4xl font-bold">- Classes -</h1>

        {CLASSES.length < 3 ? (
          // kalau 1 atau 2 card → center
          <div className="flex flex-col justify-center gap-4 md:flex-row">
            {CLASSES.map((cls) => (
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
                    <span className="font-extrabold">{cls.totalQuiz}</span>
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          // kalau 3 atau lebih card → grid
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {CLASSES.map((cls) => (
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
                    <span className="font-extrabold">{cls.totalQuiz}</span>
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

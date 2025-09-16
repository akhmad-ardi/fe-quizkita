import React from "react";
import Link from "next/link";

// component
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function page() {
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

      <section className="container px-10">
        <h1 className="my-5 text-center text-4xl font-bold">- Classes -</h1>

        <div className="flex flex-col gap-3 md:flex-row">
          <Card className="border-primary w-full gap-2">
            <CardHeader className="mb-0">
              <CardTitle className="m-0 text-xl font-semibold">
                Class Names
              </CardTitle>
            </CardHeader>

            <CardContent>
              <h4 className="text-md font-normal">
                Total Quiz: <span className="font-extrabold">5</span>
              </h4>
            </CardContent>
          </Card>

          <Card className="border-primary w-full gap-2">
            <CardHeader className="mb-0">
              <CardTitle className="m-0 text-xl font-semibold">
                Class Names
              </CardTitle>
            </CardHeader>

            <CardContent>
              <h4 className="text-md font-normal">
                Total Quiz: <span className="font-extrabold">5</span>
              </h4>
            </CardContent>
          </Card>

          <Card className="border-primary w-full gap-2">
            <CardHeader className="mb-0">
              <CardTitle className="m-0 text-xl font-semibold">
                Class Names
              </CardTitle>
            </CardHeader>

            <CardContent>
              <h4 className="text-md font-normal">
                Total Quiz: <span className="font-extrabold">5</span>
              </h4>
            </CardContent>
          </Card>
        </div>

        <div className="mt-5 text-center">
          <Button asChild>
            <Link href="/classes">View More</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

// component
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    class_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { class_id } = await params;

  return (
    <>
      <section className="container mb-10 px-10">
        <h1 className="my-5 text-center text-4xl font-bold">- Class Name -</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link href={`/classes/${class_id}/material/1`}>
            <Card className="border-primary w-full cursor-pointer gap-2 transition hover:shadow-lg">
              <CardHeader className="mb-0">
                <CardTitle className="m-0 text-xl font-semibold">
                  Material Name
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h4 className="text-md font-normal">
                  Total Question: <span className="font-extrabold">5</span>
                </h4>
              </CardContent>
            </Card>
          </Link>

          <Card className="border-primary relative w-full max-w-lg cursor-pointer items-center justify-center gap-2 transition hover:shadow-lg">
            {/* Link transparan menutupi seluruh area card */}
            <Link
              href={`/classes/${class_id}/add`}
              className="absolute inset-0 z-10"
            />

            <CardContent className="flex items-center justify-center">
              <Button>
                <Plus /> Add Material
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

import { Plus, ArrowLeft, UserStar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

// component
import { Material } from "@/api/material";
import { GetCookies } from "@/server/get-cookies";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { FormAddUser } from "./_components/FormAddUser";
import { FormDeleteClass } from "./_components/FormDeleteClass";
import { ShareClass } from "./_components/ShareClass";

type Props = {
  params: Promise<{
    class_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { class_id } = await params;

  const { token, user } = await GetCookies();

  const { status: getMaterialsStatus, data: getMaterialsRes } =
    await Material.GetMaterials(token?.value, class_id);

  if (getMaterialsStatus === 404) {
    return redirect("/classes");
  }

  return (
    <>
      <section className="container mb-10 px-10">
        <h1 className="my-5 text-center text-4xl font-bold">
          - {getMaterialsRes.data.class_name} -
        </h1>

        <div className="mb-5">
          <Card className="border-primary bg-primary/10 border">
            <CardFooter className="gap-3">
              <Button
                variant="destructive"
                className="text-destructive hover:bg-destructive border-destructive border bg-white hover:text-white"
                asChild
              >
                <Link href={"/classes"}>
                  <ArrowLeft />
                  Back
                </Link>
              </Button>

              {/* Delete Class */}
              {user.id === getMaterialsRes.data.user_id ? (
                <FormDeleteClass classId={class_id} />
              ) : null}

              {/* Add User */}
              {user.id === getMaterialsRes.data.user_id ? (
                <FormAddUser classId={class_id} />
              ) : null}

              {/* Share Class */}
              {user.id === getMaterialsRes.data.user_id ? (
                <ShareClass classId={class_id} />
              ) : null}

              {/* Leaderboard */}
              <Button asChild>
                <Link href={`/classes/${class_id}/leaderboard`}>
                  <UserStar />
                  Leaderboard
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {getMaterialsRes.data.materials.map((material) => (
            <Link
              key={material.id}
              href={`/classes/${class_id}/material/${material.id}`}
            >
              <Card className="border-primary w-full cursor-pointer gap-2 transition hover:shadow-lg">
                <CardHeader className="mb-0">
                  <CardTitle className="m-0 text-xl font-semibold">
                    {material.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="text-md font-normal">
                    Total Question:{" "}
                    <span className="font-extrabold">
                      {material.total_questions}
                    </span>
                  </h4>
                </CardContent>
              </Card>
            </Link>
          ))}

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

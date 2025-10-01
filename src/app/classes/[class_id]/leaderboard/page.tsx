import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

import { Class } from "@/api/class";
import { GetCookies } from "@/server/get-cookies";

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  params: Promise<{
    class_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { class_id } = await params;

  const { token } = await GetCookies();

  const { status: getLeaderboarStatus, data: getLeaderboardRes } =
    await Class.GetLeaderboard(token?.value, class_id);

  if (getLeaderboarStatus > 400) {
    return redirect("/classes");
  }

  return (
    <>
      <section className="container mb-10 px-10">
        <h1 className="my-5 text-center text-4xl font-bold">- Leaderboard -</h1>

        <div className="mx-auto mb-3 w-full md:w-2/3">
          <div className="mb-5">
            <Card className="border-primary bg-primary/10 border">
              <CardFooter>
                <Button
                  variant="destructive"
                  className="border-destructive text-destructive border bg-white hover:text-white"
                  asChild
                >
                  <Link href={`/classes/${class_id}`}>
                    <ArrowLeft />
                    Back
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Table className="p-10">
            <TableHeader>
              <TableRow className="bg-primary/30">
                <TableHead className="w-[50px] rounded-tl-xl text-center">
                  #
                </TableHead>
                {/* <TableHead>Username</TableHead> */}
                <TableHead>Fullname</TableHead>
                <TableHead className="w-[80px] rounded-tr-xl">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getLeaderboardRes.data?.leaderboard.map((user, index) => (
                <TableRow
                  key={index}
                  className={`${index % 2 !== 0 ? "bg-primary/30 hover:bg-primary/20" : "bg-primary/70 hover:bg-primary/50"}`}
                >
                  <TableCell
                    className={`text-center font-bold ${getLeaderboardRes.data?.leaderboard.length === index + 1 && "rounded-bl-xl"}`}
                  >
                    {index + 1}
                  </TableCell>
                  {/* <TableCell>{user.username}</TableCell> */}
                  <TableCell>{user.fullname}</TableCell>
                  <TableCell
                    className={
                      getLeaderboardRes.data?.leaderboard.length === index + 1
                        ? "rounded-br-xl"
                        : ""
                    }
                  >
                    {user.total_score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}

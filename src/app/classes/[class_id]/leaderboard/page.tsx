import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// component
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    class_id: string;
  }>;
};

export default async function page({ params }: Props) {
  const { class_id } = await params;

  const Users = [
    {
      username: "test_1",
      fullname: "test 1",
      score: 100,
    },
    {
      username: "test_1",
      fullname: "test 1",
      score: 100,
    },
    {
      username: "test_1",
      fullname: "test 1",
      score: 100,
    },
    {
      username: "test_1",
      fullname: "test 1",
      score: 100,
    },
    {
      username: "test_1",
      fullname: "test 1",
      score: 100,
    },
  ];

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
              {Users.map((u, index) => (
                <TableRow
                  key={index}
                  className={`${index % 2 !== 0 ? "bg-primary/30 hover:bg-primary/20" : "bg-primary/70 hover:bg-primary/50"}`}
                >
                  <TableCell
                    className={`text-center font-bold ${Users.length === index + 1 && "rounded-bl-xl"}`}
                  >
                    {index + 1}
                  </TableCell>
                  {/* <TableCell>{u.username}</TableCell> */}
                  <TableCell>{u.fullname}</TableCell>
                  <TableCell
                    className={
                      Users.length === index + 1 ? "rounded-br-xl" : ""
                    }
                  >
                    {u.score}
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

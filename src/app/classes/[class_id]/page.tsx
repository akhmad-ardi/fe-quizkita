import React from "react";
import Link from "next/link";
import {
  Plus,
  ArrowLeft,
  Trash,
  UserPlus,
  Share,
  UserStar,
} from "lucide-react";

// component
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormAddUser } from "./_components/FormAddUser";

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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash />
                    Delete
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Class</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure?
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button
                        variant="destructive"
                        className="text-destructive hover:bg-destructive border-destructive border bg-white hover:text-white"
                      >
                        Cancel
                      </Button>
                    </AlertDialogCancel>

                    <AlertDialogAction asChild>
                      <Button
                        variant="destructive"
                        className="text-destructive border-destructive !bg-destructive hover:!bg-destructive/90 border"
                      >
                        <Trash /> Delete
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Add User */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus />
                    Add User
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                    <DialogDescription>
                      Adding a user to class
                    </DialogDescription>
                  </DialogHeader>

                  <FormAddUser />
                </DialogContent>
              </Dialog>

              {/* Link Class */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>
                    <Share />
                    Share Class
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Share Class</AlertDialogTitle>
                    <AlertDialogDescription>
                      Share class for other user
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                      <Button className="text-destructive hover:bg-destructive border-destructive border bg-white hover:text-white">
                        Cancel
                      </Button>
                    </AlertDialogCancel>

                    <AlertDialogAction asChild>
                      <Button className="text-primary border-primary !bg-primary hover:!bg-primary/90 border">
                        <Share /> Copy Class Code
                      </Button>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Leaderboard */}
              <Button asChild>
                <Link href={`/classes/1/leaderboard`}>
                  <UserStar />
                  Leaderboard
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

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

"use client";
import { useState } from "react";

import { api } from "@/trpc/react";
import type { User } from "@prisma/client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CreateUser() {
  const [details, setDetails] = useState<
    Omit<User, "cuid" | "updatedAt" | "role_id">
  >({
    name: "",
    email: "",
  });

  const { mutate } = api.user.create.useMutation({
    onSuccess: () => {
      toast.success("User created successfully");
      setDetails({ name: "", email: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = async () => {
    mutate(details);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button asChild variant={"ghost"} className="border">
          <div className="flex items-center space-x-2">
            <UserPlus size={24} />
            <span className="">Create User</span>
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New User</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center space-x-4 py-8">
            <Input
              placeholder="Email"
              name="email"
              value={details.email}
              onChange={onChangeHandler}
            />
            <Input
              placeholder="Name"
              name="name"
              value={details.name}
              onChange={onChangeHandler}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={formSubmitHandler}>
            Create User
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

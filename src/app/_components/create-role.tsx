"use client";
import { useState } from "react";

import { api } from "@/trpc/react";
import type { Role } from "@prisma/client";

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

import { Drama } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function CreateUser() {
  const [details, setDetails] = useState<Omit<Role, "cuid">>({
    title: "",
  });

  const { mutate } = api.user.createRole.useMutation({
    onSuccess: () => {
      toast.success("User created successfully");
      setDetails({ title: "" });
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
            <Drama size={24} />
            <span className="">Create Role</span>
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Role</AlertDialogTitle>
          <AlertDialogDescription className="flex items-center space-x-4 py-8">
            <Input
              placeholder="Role Name"
              name="title"
              value={details.title as string}
              onChange={onChangeHandler}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={formSubmitHandler}>
            Create Role
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

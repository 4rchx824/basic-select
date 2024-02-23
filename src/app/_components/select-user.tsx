"use client";
import type { User } from "@prisma/client";
import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  users: User[];
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const SelectUser = ({ users, setUser }: Props) => {
  const handleUserChange = (id: string) => {
    const found = users.find((u) => u.cuid === id);
    setUser(found);
  };

  return (
    <Select onValueChange={(id) => handleUserChange(id)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select User" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.cuid} value={user.cuid}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectUser;

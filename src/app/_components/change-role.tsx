"use client";
import type { User, Role } from "@prisma/client";
import React, { useState } from "react";
import SelectUser from "./select-user";
import SelectRole from "./select-role";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

type Props = {
  users: User[];
  roles: Role[];
};

const ChangeRole = ({ users, roles }: Props) => {
  const [user, setUser] = useState<User | undefined>();
  const [role, setRole] = useState<Role | undefined>();

  const { mutate: update } = api.user.update.useMutation({
    onSuccess: () => {
      toast.success("Role updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleUpdate = () => {
    if (user?.role_id === role?.cuid) {
      toast.error("User already has this role");
      return;
    }

    if (!user || !role) {
      toast.error("Please select a user and role");
      return;
    }
    update({ cuid: user.cuid, role_id: role.cuid });
  };

  return (
    <div className="flex items-center space-x-4">
      <SelectUser users={users} setUser={setUser} />
      <SelectRole user={user} roles={roles} setRole={setRole} />
      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
};

export default ChangeRole;

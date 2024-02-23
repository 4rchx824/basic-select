import type { Role, User } from "@prisma/client";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  user: User | undefined;
  roles: Role[];
  setRole: React.Dispatch<React.SetStateAction<Role | undefined>>;
};

const SelectRole = ({ user, roles, setRole }: Props) => {
  const [selectedRole, setSelectedRole] = useState<Role | undefined>(undefined);

  useEffect(() => {
    if (user) {
      const i_role = roles.find((r) => r.cuid === user.role_id);
      setSelectedRole(i_role);
      setRole(i_role);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleUserChange = (id: string) => {
    const found = roles.find((r) => r.cuid === id);

    setSelectedRole(found);
    setRole(found);
  };

  return (
    <Select
      onValueChange={(id) => handleUserChange(id)}
      value={selectedRole?.cuid}
    >
      <SelectTrigger className="w-[180px]" disabled={!user}>
        <SelectValue placeholder="Select Role" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.cuid} value={role.cuid}>
            {role.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectRole;

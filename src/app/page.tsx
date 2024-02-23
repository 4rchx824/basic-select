import CreateUser from "@/app/_components/create-user";
import CreateRole from "./_components/create-role";
import { api } from "@/trpc/server";
import ChangeRole from "./_components/change-role";
export default async function Page() {
  const users = await api.user.findMany.query();
  const roles = await api.user.findRoles.query();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex items-center space-x-4 pb-8">
        <CreateUser />
        <CreateRole />
      </div>

      <ChangeRole users={users} roles={roles} />
    </main>
  );
}

import { LogoutButton } from "@/components/auth/LogoutButton";
import { createServerClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const client = createServerClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div>
      <h1>{user.email}</h1>
      <LogoutButton />
    </div>
  );
}

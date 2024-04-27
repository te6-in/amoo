import { LoginButton } from "@/components/auth/LoginButton";
import { createServerClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthPage() {
  const client = createServerClient();

  const {
    data: { user },
  } = await client.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LoginButton />;
}

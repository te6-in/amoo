import { createServerClient } from "@/libs/supabase/server";

import { LoginButton } from "@/components/auth/LoginButton";

import { redirect } from "next/navigation";

export default async function AuthPage() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LoginButton />;
}

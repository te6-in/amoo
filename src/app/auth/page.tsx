import { createServerClient } from "@/libs/supabase/server";

import { GitHubAuthButton } from "@/components/auth/GitHubAuthButton";

import { redirect } from "next/navigation";

export default async function AuthPage() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-64">
      <GitHubAuthButton />
      <GitHubAuthButton />
    </div>
  );
}

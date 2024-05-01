import { createServerClient } from "@/libs/supabase/server";

import { EmailAuthForm } from "@/components/auth/EmailAuthForm";
import { GitHubAuthButton } from "@/components/auth/GitHubAuthButton";
import { DividerWithLabel } from "@/components/ui/DividerWithLabel";

import { redirect } from "next/navigation";

interface AuthPageProps {
  searchParams: {
    redirectTo?: string;
  };
}

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(searchParams.redirectTo || "/dashboard");
  }

  return (
    <div className="max-w-64 flex flex-col gap-4">
      <EmailAuthForm redirectTo={searchParams.redirectTo} />
      <DividerWithLabel />
      <GitHubAuthButton redirectTo={searchParams.redirectTo} />
    </div>
  );
}

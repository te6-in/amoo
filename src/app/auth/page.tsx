import { createServerClient } from "@/libs/supabase/server";

import { EmailAuthForm } from "@/app/auth/_components/EmailAuthForm";
import { GitHubAuthButton } from "@/app/auth/_components/GitHubAuthButton";

import { DividerWithLabel } from "@/components/DividerWithLabel";

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

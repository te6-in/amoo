import { createServerClient } from "@/libs/supabase/server";

import { GitHubAuthButton } from "@/components/auth/GitHubAuthButton";

import { redirect } from "next/navigation";

interface ErrorPageProps {
  searchParams: {
    redirectTo?: string;
  };
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(searchParams.redirectTo ?? "/dashboard");
  }

  return (
    <div>
      <div>에러 페이지, redirectTo: {searchParams.redirectTo ?? "없음"}</div>
      <GitHubAuthButton redirectTo={searchParams.redirectTo} />
    </div>
  );
}

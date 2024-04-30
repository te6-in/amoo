import { createServerClient } from "@/libs/supabase/server";

import { LoginButton } from "@/components/auth/LoginButton";

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
      <LoginButton redirectTo={searchParams.redirectTo} />
    </div>
  );
}

import { createServerClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

import { LoginButton } from "@/components/auth/LoginButton";

interface ErrorPageProps {
  searchParams: {
    redirectTo?: string;
  };
}

export default async function ErrorPage({ searchParams }: ErrorPageProps) {
  const client = createServerClient();

  const {
    data: { user },
  } = await client.auth.getUser();

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

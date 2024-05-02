import { createServerClient } from "@/libs/supabase/server";

import { AuthSubscribeForm } from "@/app/auth/_components/AuthSubscribeForm";

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
    <div className="max-w-80 flex flex-col gap-4">
      <AuthSubscribeForm />
    </div>
  );
}

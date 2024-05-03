import { createServerClient } from "@/libs/supabase/server";
import type { NextAppPage } from "@/types/next";

import { AuthSubscribeForm } from "@/app/auth/_components/AuthSubscribeForm";

import { redirect } from "next/navigation";

type AuthPageProps = NextAppPage<"redirectTo">;

export default async function AuthPage({
  searchParams: { redirectTo },
}: AuthPageProps) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(
      typeof redirectTo === "string" && redirectTo ? redirectTo : "/dashboard",
    );
  }

  return (
    <div className=" flex max-w-80 flex-col gap-4">
      <AuthSubscribeForm
        redirectTo={
          typeof redirectTo === "string" && redirectTo ? redirectTo : undefined
        }
      />
    </div>
  );
}

import { TRUE_STRING } from "@/libs/constants";
import { createServerClient } from "@/libs/supabase/server";
import type { NextAppPage } from "@/types/next";

import { AuthSubscribeForm } from "@/app/auth/_components/AuthSubscribeForm";
import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";

import { redirect } from "next/navigation";

type ErrorPageProps = NextAppPage<"redirectTo" | keyof SubscribeFormValues>;

export default async function ErrorPage({
  searchParams: { redirectTo, subscribe, subscribeToAds },
}: ErrorPageProps) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(
      typeof redirectTo === "string" && redirectTo ? redirectTo : "/dashboard",
    );
  }

  const defaultValues: SubscribeFormValues | undefined =
    subscribe && subscribeToAds
      ? {
          subscribe: subscribe === TRUE_STRING,
          subscribeToAds: subscribeToAds === TRUE_STRING,
        }
      : undefined;

  return (
    <div>
      <div>에러 페이지</div>
      <AuthSubscribeForm
        defaultValues={defaultValues}
        redirectTo={
          typeof redirectTo === "string" && redirectTo ? redirectTo : undefined
        }
      />
    </div>
  );
}

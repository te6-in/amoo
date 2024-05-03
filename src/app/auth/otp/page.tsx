import { withQuery } from "ufo";

import { createBrowserClient } from "@/libs/supabase/browser";
import type { NextAppPage } from "@/types/next";

import { OtpForm } from "@/app/auth/_components/OtpForm";
import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";

import { redirect } from "next/navigation";

type OtpPageProps = NextAppPage<
  "email" | "redirectTo" | keyof SubscribeFormValues
>;

export default async function OtpPage({ searchParams }: OtpPageProps) {
  const { email, redirectTo, subscribe, subscribeToAds } = searchParams;

  // filters out null, string[], and empty string
  if (typeof email !== "string" || !email) {
    redirect(withQuery("/auth", searchParams));
  }

  const supabase = createBrowserClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(typeof redirectTo === "string" ? redirectTo : "/dashboard");
  }

  const subscribeFormData = {
    subscribe: subscribe === "true",
    subscribeToAds: subscribeToAds === "true",
  };

  return (
    <div className="max-w-64 flex flex-col gap-4">
      <OtpForm
        email={email}
        redirectTo={typeof redirectTo === "string" ? redirectTo : undefined}
        subscribeFormData={subscribeFormData}
      />
    </div>
  );
}

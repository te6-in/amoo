import { type QueryObject, withQuery } from "ufo";

import { createBrowserClient } from "@/libs/supabase/browser";

import { OtpForm } from "@/app/auth/_components/OtpForm";
import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";

import { redirect } from "next/navigation";

interface OtpPageSearchParams extends SubscribeFormValues, QueryObject {
  email?: string;
  redirectTo?: string;
}

interface OtpPageProps {
  searchParams: OtpPageSearchParams;
}

export default async function OtpPage({ searchParams }: OtpPageProps) {
  if (!searchParams.email) {
    redirect(withQuery("/auth", searchParams));
  }

  const supabase = createBrowserClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(searchParams.redirectTo || "/dashboard");
  }

  const subscribeFormData = {
    subscribe: searchParams.subscribe,
    subscribeToAds: searchParams.subscribeToAds,
  };

  return (
    <div className="max-w-64 flex flex-col gap-4">
      <OtpForm
        email={searchParams.email}
        redirectTo={searchParams.redirectTo}
        subscribeFormData={subscribeFormData}
      />
    </div>
  );
}

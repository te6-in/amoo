import { withQuery } from "ufo";

import { createBrowserClient } from "@/libs/supabase/browser";

import OtpForm from "@/components/auth/OtpForm";

import { redirect } from "next/navigation";

interface OtpPageProps {
  searchParams: {
    email?: string;
    redirectTo?: string;
  };
}

export default async function OtpPage({ searchParams }: OtpPageProps) {
  if (!searchParams.email) {
    redirect(withQuery("/auth", { redirectTo: searchParams.redirectTo }));
  }

  const supabase = createBrowserClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect(searchParams.redirectTo || "/dashboard");
  }

  return (
    <div className="max-w-64 flex flex-col gap-4">
      <OtpForm
        email={searchParams.email}
        redirectTo={searchParams.redirectTo}
      />
    </div>
  );
}

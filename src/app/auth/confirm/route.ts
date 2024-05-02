import type { EmailOtpType, Provider } from "@supabase/supabase-js";
import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createServerClient } from "@/libs/supabase/server";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code =
    searchParams.get("code") === "" ? undefined : searchParams.get("code");

  const tokenHash =
    searchParams.get("tokenHash") === ""
      ? undefined
      : searchParams.get("tokenHash");
  const type =
    searchParams.get("type") === ""
      ? undefined
      : (searchParams.get("type") as EmailOtpType);

  const redirectTo =
    searchParams.get("redirectTo") === ""
      ? undefined
      : searchParams.get("redirectTo");

  if (!(code || (tokenHash && type))) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  const supabase = createServerClient();
  let error;

  if (code) {
    error = (await supabase.auth.exchangeCodeForSession(code)).error;
  }

  if (tokenHash && type) {
    error = (await supabase.auth.verifyOtp({ type, token_hash: tokenHash }))
      .error;
  }

  if (error) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  return NextResponse.redirect(
    withBase(
      withQuery("/auth/username", { redirectTo }),
      env.NEXT_PUBLIC_SITE_URL,
    ),
  );
}

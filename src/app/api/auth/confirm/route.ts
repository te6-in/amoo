import type { EmailOtpType } from "@supabase/supabase-js";
import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createServerClient } from "@/libs/supabase/server";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const tokenHash = searchParams.get("tokenHash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const redirectTo =
    searchParams.get("redirectTo") === ""
      ? undefined
      : searchParams.get("redirectTo");

  if (!tokenHash || !type) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  const supabase = createServerClient();
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash: tokenHash,
  });

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

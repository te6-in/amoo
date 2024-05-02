import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createServerClient } from "@/libs/supabase/server";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const redirectTo =
    searchParams.get("redirectTo") === ""
      ? undefined
      : searchParams.get("redirectTo");

  if (!code) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  const supabase = createServerClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // unreachable, just for type checking
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

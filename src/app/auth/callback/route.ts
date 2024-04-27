import { env } from "@/env";
import { createServerClient } from "@/libs/supabase/server";
import { NextResponse, type NextRequest } from "next/server";
import { withBase, withQuery } from "ufo";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get("code");
  const redirectTo = searchParams.get("redirectTo");

  if (!code) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  const client = createServerClient();
  const { error } = await client.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  return NextResponse.redirect(
    withBase(redirectTo ?? "/dashboard", env.NEXT_PUBLIC_SITE_URL),
  );
}

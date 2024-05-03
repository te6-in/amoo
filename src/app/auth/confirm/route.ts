import type { EmailOtpType } from "@supabase/supabase-js";
import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { TRUE_STRING } from "@/libs/constants";
import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import { type NextRequest, NextResponse } from "next/server";

// handles magic link and oauth login
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // for github oauth
  const code = searchParams.get("code");

  // for magic link
  const tokenHash = searchParams.get("tokenHash");
  const type = searchParams.get("type");

  // for redirecting
  const redirectTo = searchParams.get("redirectTo");
  const subscribe = searchParams.get("subscribe");
  const subscribeToAds = searchParams.get("subscribeToAds");

  // also filters out empty strings as well as nulls
  if (!(code || (tokenHash && type))) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo, subscribe, subscribeToAds }),
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
    error = (
      await supabase.auth.verifyOtp({
        type: type as EmailOtpType,
        token_hash: tokenHash,
      })
    ).error;
  }

  if (error) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo, subscribe, subscribeToAds }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // unreachable
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo, subscribe, subscribeToAds }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        ...(subscribe === TRUE_STRING && { is_subscribed: true }),
        ...(subscribe === TRUE_STRING && { last_subscribed_at: new Date() }),
        ...(subscribeToAds === TRUE_STRING && { is_subscribed_to_ads: true }),
      },
    });
  } catch (error) {
    return NextResponse.redirect(
      withBase(
        withQuery("/auth/error", { redirectTo, subscribe, subscribeToAds }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    );
  }

  if (
    redirectTo?.startsWith(
      withBase("/auth/on-magic-link", env.NEXT_PUBLIC_SITE_URL),
    )
  ) {
    return NextResponse.redirect(redirectTo);
  }

  return NextResponse.redirect(
    withBase(
      withQuery("/auth/username", { redirectTo }),
      env.NEXT_PUBLIC_SITE_URL,
    ),
  );
}

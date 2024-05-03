import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import { type NextRequest, NextResponse } from "next/server";

// handles magic link and oauth login
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const redirectTo = searchParams.get("redirectTo");

  const subscribe = searchParams.get("subscribe");
  const subscribeToAds = searchParams.get("subscribeToAds");

  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
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
        ...(subscribe === "true" && { is_subscribed: true }),
        ...(subscribe === "true" && { last_subscribed_at: new Date() }),
        ...(subscribeToAds === "true" && { is_subscribed_to_ads: true }),
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

  return NextResponse.redirect(
    withBase(
      withQuery("/auth/username", { redirectTo }),
      env.NEXT_PUBLIC_SITE_URL,
    ),
  );
}

import { createServerClient } from "@/libs/supabase/server";
import type { DefaultResponse } from "@/libs/types/response";
import { prisma } from "@/server/db";

import { NextResponse } from "next/server";

export type SubscribePostResponse = DefaultResponse;

const setSubscriptionStatus = async (status: boolean) => {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json<SubscribePostResponse>(
      { ok: false, error: "로그인이 필요합니다." },
      { status: 401 },
    );
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        is_subscribed: status,
        ...(status && { last_subscribed_at: new Date() }),
      },
    });

    return NextResponse.json<SubscribePostResponse>({ ok: true });
  } catch (error) {
    return NextResponse.json<SubscribePostResponse>(
      { ok: false, error: "구독 상태를 변경하지 못했습니다." },
      { status: 500 },
    );
  }
};

export async function POST() {
  return await setSubscriptionStatus(true);
}

export async function DELETE() {
  return await setSubscriptionStatus(false);
}

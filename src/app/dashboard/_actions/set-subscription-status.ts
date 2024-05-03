"use server";

import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import { revalidatePath } from "next/cache";

interface SetSubscriptionStatusRequest {
  status: boolean;
}

interface SetSubscriptionStatusResponse {
  status: number;
  error?: Error;
}

export async function setSubscriptionStatus({
  status,
}: SetSubscriptionStatusRequest): Promise<SetSubscriptionStatusResponse> {
  const supabase = createServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return {
      error: new Error("사용자 정보를 찾을 수 없습니다."),
      status: 401,
    };
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        is_subscribed: status,
        ...(status && { last_subscribed_at: new Date() }),
      },
    });

    // FIXME
    revalidatePath("/dashboard");

    return { status: 200 };
  } catch (error) {
    return {
      error: new Error("데이터베이스 업데이트에 실패했습니다."),
      status: 500,
    };
  }
}

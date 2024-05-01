"use server";

import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import { revalidatePath } from "next/cache";

export async function setSubscriptionStatus(status: boolean) {
  const supabase = createServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user) {
    return { error, status: 401 };
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
    return { error, status: 500 };
  }
}

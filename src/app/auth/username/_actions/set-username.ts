"use server";

import { withQuery } from "ufo";

import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import type { UsernameFormValues } from "@/app/auth/username/_components/UsernameForm";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface SetUsernameRequest {
  formData: UsernameFormValues;
  redirectTo?: string;
}

interface SetUsernameResponse {
  status: number;
  error?: Error;
}

export async function setUsername({
  formData: { name },
  redirectTo,
}: SetUsernameRequest): Promise<SetUsernameResponse | void> {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(withQuery("/auth", { redirectTo }));
  }

  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { username: name },
    });

    revalidatePath(redirectTo || "/dashboard");
    redirect(redirectTo || "/dashboard");
  } catch (error) {
    return {
      status: 500,
      error: new Error("데이터베이스 업데이트에 실패했습니다."),
    };
  }
}

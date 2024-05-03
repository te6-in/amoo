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

export async function setUsername({
  formData: { name },
  redirectTo,
}: SetUsernameRequest) {
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
    return { error, status: 500 };
  }
}

"use server";

import { withQuery } from "ufo";

import { env } from "@/env";
import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import type { EmailAuthFormValues } from "@/components/auth/EmailAuthForm";
import type { OtpFormValues } from "@/components/auth/OtpForm";
import type { UsernameFormValues } from "@/components/auth/UsernameForm";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface AuthRequest {
  formData: EmailAuthFormValues;
  redirectTo?: string;
}

interface CheckOtpRequest {
  formData: OtpFormValues;
  email: string;
  redirectTo?: string;
}

interface SetUsernameRequest {
  formData: UsernameFormValues;
  redirectTo?: string;
}

export async function auth({ formData: { email }, redirectTo }: AuthRequest) {
  const supabase = createServerClient();

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${env.NEXT_PUBLIC_SITE_URL}${redirectTo || "/dashboard"}`,
    },
  });

  if (error) {
    console.log(error);
    redirect(withQuery("/auth/error", { redirectTo }));
  }

  revalidatePath("/auth/otp", "layout");
  redirect(withQuery("/auth/otp", { email, redirectTo }));
}

export async function checkOtp({
  formData: { otp },
  email,
  redirectTo,
}: CheckOtpRequest) {
  const supabase = createServerClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) {
    console.log(error);
    redirect(withQuery("/auth/error", { redirectTo }));
  }

  revalidatePath("/auth/username", "layout");
  redirect(withQuery("/auth/username", { redirectTo }));
}

export async function setUsername({
  formData: { username },
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
      data: { username },
    });

    revalidatePath(redirectTo || "/dashboard", "layout");
    redirect(redirectTo || "/dashboard");
  } catch (error) {
    // FIXME: handle better
    console.log(error);
  }
}

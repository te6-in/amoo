"use server";

import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import type { EmailAuthFormValues } from "@/app/auth/_components/AuthForm/EmailAuthForm";
import type { OtpFormValues } from "@/app/auth/_components/OtpForm";
import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";
import type { UsernameFormValues } from "@/app/auth/_components/UsernameForm";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface AuthRequest {
  formData: EmailAuthFormValues;
  subscribeFormData: SubscribeFormValues;
  redirectTo?: string;
}

interface VerifyOtpRequest {
  formData: OtpFormValues;
  subscribeFormData: SubscribeFormValues;
  email: string;
  redirectTo?: string;
}

interface SetUsernameRequest {
  formData: UsernameFormValues;
  redirectTo?: string;
}

export async function emailAuth({
  formData: { email },
  subscribeFormData: { subscribe, subscribeToAds },
  redirectTo,
}: AuthRequest) {
  const supabase = createServerClient();

  // sends an OTP to the email
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: withBase(
        withQuery("/auth/on-magic-link", {
          redirectTo,
          subscribe,
          subscribeToAds,
        }),
        env.NEXT_PUBLIC_SITE_URL,
      ),
    },
  });

  if (error) {
    console.log(error);

    revalidatePath("/auth/error");
    redirect(
      withQuery("/auth/error", { redirectTo, subscribe, subscribeToAds }),
    );
  }

  revalidatePath("/auth/otp");
  redirect(
    // FIXME: hash email
    withQuery("/auth/otp", { email, redirectTo, subscribe, subscribeToAds }),
  );
}

export async function verifyOtp({
  formData: { otp },
  subscribeFormData: { subscribe, subscribeToAds },
  email,
  redirectTo,
}: VerifyOtpRequest) {
  const supabase = createServerClient();

  const { error } = await supabase.auth.verifyOtp({
    email,
    token: otp,
    type: "email",
  });

  if (error) {
    redirect(
      withQuery("/auth/error", { redirectTo, subscribe, subscribeToAds }),
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // unreachable
    redirect(
      withQuery("/auth/error", { redirectTo, subscribe, subscribeToAds }),
    );
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    // unreachable, probably
    redirect(
      withQuery("/auth/error", { redirectTo, subscribe, subscribeToAds }),
    );
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      ...(subscribe && { is_subscribed: true }),
      ...(subscribe && { last_subscribed_at: new Date() }),
      ...(subscribeToAds && { is_subscribed_to_ads: true }),
    },
  });

  revalidatePath("/auth/username");
  redirect(withQuery("/auth/username", { redirectTo }));
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

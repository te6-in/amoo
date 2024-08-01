"use server";

import { withQuery } from "ufo";

import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";
import type { OtpFormValues } from "@/app/auth/otp/_components/OtpForm";

interface VerifyOtpRequest {
  formData: OtpFormValues;
  subscribeFormData: SubscribeFormValues;
  email: string;
  redirectTo?: string;
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

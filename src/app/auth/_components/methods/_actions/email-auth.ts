"use server";

import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createServerClient } from "@/libs/supabase/server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { EmailAuthFormValues } from "@/app/auth/_components/methods/EmailAuthForm";
import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";

interface EmailAuthRequest {
  formData: EmailAuthFormValues;
  subscribeFormData: SubscribeFormValues;
  redirectTo?: string;
}

export async function emailAuth({
  formData: { email },
  subscribeFormData: { subscribe, subscribeToAds },
  redirectTo,
}: EmailAuthRequest) {
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

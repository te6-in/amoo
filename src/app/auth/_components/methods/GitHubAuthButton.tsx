"use client";

import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createBrowserClient } from "@/libs/supabase/browser";

import { Button } from "@/components/Button";

import { Github } from "lucide-react";

import { useState } from "react";

import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";
import type { UseFormGetValues } from "react-hook-form";

interface GitHubAuthButtonProps {
  redirectTo?: string;
  getValues?: UseFormGetValues<SubscribeFormValues>;
}

export function GitHubAuthButton({
  redirectTo,
  getValues,
}: GitHubAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient();

  const auth = async () => {
    setIsLoading(true);

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: withBase(
          withQuery("/auth/confirm", {
            redirectTo,
            subscribe: getValues ? getValues("subscribe") : true,
            subscribeToAds: getValues ? getValues("subscribeToAds") : true,
          }),
          env.NEXT_PUBLIC_SITE_URL,
        ),
      },
    });
  };

  return (
    <Button
      onClick={auth}
      text="GitHub로 로그인"
      icon={Github}
      isLoading={isLoading}
    />
  );
}

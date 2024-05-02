"use client";

import { Github } from "lucide-react";
import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createBrowserClient } from "@/libs/supabase/browser";

import { Button } from "@/components/Button";

import { useState } from "react";

interface GitHubAuthButtonProps {
  redirectTo?: string;
}

export function GitHubAuthButton({ redirectTo }: GitHubAuthButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient();

  const auth = async () => {
    setIsLoading(true);

    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: withBase(
          withQuery("/auth/callback", { redirectTo, provider: "github" }),
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

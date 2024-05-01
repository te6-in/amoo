"use client";

import { Github } from "lucide-react";
import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createBrowserClient } from "@/libs/supabase/browser";

import { Button } from "@/components/ui/Button";

interface GitHubAuthButtonProps {
  redirectTo?: string;
}

export function GitHubAuthButton({ redirectTo }: GitHubAuthButtonProps) {
  const supabase = createBrowserClient();

  const auth = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: withBase(
          withQuery("/api/auth/callback", { redirectTo }),
          env.NEXT_PUBLIC_SITE_URL,
        ),
      },
    });
  };

  return <Button onClick={auth} text="GitHub로 로그인" icon={Github} />;
}
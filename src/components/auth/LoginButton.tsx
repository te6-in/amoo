"use client";

import { Github } from "lucide-react";
import { withBase, withQuery } from "ufo";

import { env } from "@/env";
import { createBrowserClient } from "@/libs/supabase/browser";

import { Button } from "@/components/ui/Button";

interface LoginButtonProps {
  redirectTo?: string;
}

export function LoginButton({ redirectTo }: LoginButtonProps) {
  const supabase = createBrowserClient();

  const login = async () => {
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

  return <Button onClick={login} text="GitHub로 로그인" icon={Github} />;
}

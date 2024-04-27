"use client";

import { createBrowserClient } from "@/libs/supabase/browser";
import { Button } from "@te6/ui";
import { env } from "@/env";
import { withBase, withQuery } from "ufo";

interface LoginButtonProps {
  redirectTo?: string;
}

export function LoginButton({ redirectTo }: LoginButtonProps) {
  const client = createBrowserClient();

  const login = async () => {
    await client.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: withBase(
          withQuery("/auth/callback", { redirectTo }),
          env.NEXT_PUBLIC_SITE_URL,
        ),
      },
    });
  };

  return <Button onClick={login} text="GitHub로 로그인" />;
}

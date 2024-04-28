"use client";

import { Button } from "@te6/ui";
import { LogOut } from "lucide-react";

import { createBrowserClient } from "@/libs/supabase/browser";

import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  redirectTo?: string;
}

export function LogoutButton({ redirectTo }: LogoutButtonProps) {
  const client = createBrowserClient();
  const router = useRouter();

  const logout = async () => {
    await client.auth.signOut();

    router.push(redirectTo ?? "/auth");
  };

  return <Button onClick={logout} text="로그아웃" icon={LogOut} />;
}

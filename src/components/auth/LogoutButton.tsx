"use client";

import { LogOut } from "lucide-react";

import { createBrowserClient } from "@/libs/supabase/browser";

import { Button } from "@/components/ui/Button";

import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  redirectTo?: string;
}

export function LogoutButton({ redirectTo }: LogoutButtonProps) {
  const supabase = createBrowserClient();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();

    router.push(redirectTo ?? "/auth");
  };

  return <Button onClick={logout} text="로그아웃" icon={LogOut} />;
}

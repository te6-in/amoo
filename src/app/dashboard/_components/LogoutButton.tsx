"use client";

import { createBrowserClient } from "@/libs/supabase/browser";

import { Button } from "@/components/Button";

import { LogOut } from "lucide-react";

import { useRouter } from "next/navigation";

import { useState } from "react";

interface LogoutButtonProps {
  redirectTo?: string;
}

export function LogoutButton({ redirectTo }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createBrowserClient();
  const router = useRouter();

  const logout = async () => {
    setIsLoading(true);

    await supabase.auth.signOut();

    router.push(redirectTo || "/auth");
  };

  return (
    <Button
      onClick={logout}
      text="로그아웃"
      icon={LogOut}
      isLoading={isLoading}
    />
  );
}

import { withQuery } from "ufo";

import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import { UsernameForm } from "@/app/auth/username/_components/UsernameForm";

import { redirect } from "next/navigation";

import type { NextAppPage } from "@/types/next";

type UsernamePageProps = NextAppPage<"redirectTo">;

export default async function UsernamePage({
  searchParams: { redirectTo },
}: UsernamePageProps) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(withQuery("/auth", { redirectTo }));
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    // unrechable(probably), just for type checking
    redirect(withQuery("/auth", { redirectTo }));
  }

  if (dbUser.username) {
    redirect(
      typeof redirectTo === "string" && redirectTo ? redirectTo : "/dashboard",
    );
  }

  return (
    <div className="flex max-w-64 flex-col gap-4">
      <UsernameForm
        redirectTo={
          typeof redirectTo === "string" && redirectTo ? redirectTo : undefined
        }
      />
    </div>
  );
}

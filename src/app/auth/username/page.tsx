import { withQuery } from "ufo";

import { createServerClient } from "@/libs/supabase/server";
import { prisma } from "@/server/db";

import UsernameForm from "@/components/auth/UsernameForm";

import { redirect } from "next/navigation";

interface UsernamePageProps {
  searchParams: {
    redirectTo?: string;
  };
}

export default async function UsernamePage({
  searchParams,
}: UsernamePageProps) {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(withQuery("/auth", { redirectTo: searchParams.redirectTo }));
  }

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) {
    // unrechable(probably), just for type checking
    redirect(withQuery("/auth", { redirectTo: searchParams.redirectTo }));
  }

  if (dbUser.username) {
    redirect(searchParams.redirectTo || "/dashboard");
  }

  return (
    <div className="max-w-64 flex flex-col gap-4">
      <UsernameForm redirectTo={searchParams.redirectTo} />
    </div>
  );
}

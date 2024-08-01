import { getReadableRole } from "@/libs/ui";
import { prisma } from "@/server/db";

import { LogoutButton } from "@/app/dashboard/_components/LogoutButton";
import { ManageSubscriptionButton } from "@/app/dashboard/_components/ManageSubscriptionButton";
import { SubscribeButton } from "@/app/dashboard/_components/SubscribeButton";

import { UserIcon } from "lucide-react";

import Image from "next/image";

import type { User } from "@supabase/supabase-js";

interface ProfileProps {
  user: User;
}

export async function Profile({ user }: ProfileProps) {
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) return null;

  return (
    <div className="flex max-w-64 flex-col gap-4 rounded-xl border border-neutral-300 bg-neutral-100 p-5 shadow dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex flex-col items-center gap-2.5">
        {user.user_metadata.avatar_url ? (
          <Image
            className="rounded-full"
            width={64}
            height={64}
            src={user.user_metadata.avatar_url as string}
            alt={`${dbUser.username ?? user.email ?? "정보 없음"}님의 프로필 사진`}
          />
        ) : (
          <div className="flex size-16 items-center justify-center rounded-full bg-neutral-300 text-neutral-500 dark:bg-neutral-700 dark:text-neutral-500">
            <UserIcon size={32} />
          </div>
        )}
        <div className="flex flex-col">
          <div className="line-clamp-1 text-center text-lg font-bold text-neutral-950 dark:text-neutral-50">
            {dbUser.username ?? user.email ?? "정보 없음"}
          </div>
          <div className="text-center text-sm font-medium text-neutral-600 dark:text-neutral-400">
            {getReadableRole(dbUser.role)}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <LogoutButton />
        {dbUser.is_subscribed ? (
          <ManageSubscriptionButton />
        ) : (
          <SubscribeButton
            elementToShowOnSuccess={<ManageSubscriptionButton />}
          />
        )}
      </div>
    </div>
  );
}

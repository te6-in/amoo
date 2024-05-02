import type { User } from "@supabase/supabase-js";

import { getReadableRole } from "@/libs/ui";
import { prisma } from "@/server/db";

import { LogoutButton } from "@/app/dashboard/_components/LogoutButton";
import { ManageSubscriptionButton } from "@/app/dashboard/_components/ManageSubscriptionButton";
import { SubscribeButton } from "@/app/dashboard/_components/SubscribeButton";

import { UserIcon } from "lucide-react";

import Image from "next/image";

interface ProfileProps {
  user: User;
}

export async function Profile({ user }: ProfileProps) {
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
  });

  if (!dbUser) return null;

  return (
    <div className="p-5 bg-neutral-100 border border-neutral-300 dark:border-neutral-700 shadow max-w-64 dark:bg-neutral-800 rounded-xl flex flex-col gap-4">
      <div className="flex flex-col gap-2.5 items-center">
        {user.user_metadata.avatar_url ? (
          <Image
            className="rounded-full"
            width={64}
            height={64}
            src={user.user_metadata.avatar_url as string}
            alt={`${dbUser.username ?? user.email ?? "정보 없음"}님의 프로필 사진`}
          />
        ) : (
          <div className="size-16 rounded-full bg-neutral-300 dark:bg-neutral-700 flex items-center justify-center text-neutral-500 dark:text-neutral-500">
            <UserIcon size={32} />
          </div>
        )}
        <div className="flex flex-col">
          <div className="font-bold line-clamp-1 text-lg text-neutral-950 dark:text-neutral-50 text-center">
            {dbUser.username ?? user.email ?? "정보 없음"}
          </div>
          <div className="font-medium text-sm text-neutral-600 dark:text-neutral-400 text-center">
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

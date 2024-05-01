import type { User } from "@supabase/supabase-js";

import { getReadableRole } from "@/libs/ui";
import { prisma } from "@/server/db";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { ManageSubscriptionButton } from "@/components/profile/ManageSubscriptionButton";
import { SubscribeButton } from "@/components/profile/SubscribeButton";

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
      <div className="flex flex-col gap-2.5">
        <Image
          className="rounded-full mx-auto"
          width={64}
          height={64}
          src={user.user_metadata.avatar_url as string}
          alt={`${dbUser.username}님의 프로필 사진`}
        />
        <div className="flex flex-col">
          <div className="font-bold line-clamp-1 text-lg text-neutral-950 dark:text-neutral-50 text-center">
            {dbUser.username}
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

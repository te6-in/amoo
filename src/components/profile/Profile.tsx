import type { User } from "@supabase/supabase-js";

import { LogoutButton } from "@/components/auth/LogoutButton";

import Image from "next/image";

interface ProfileProps {
  user: User;
}

export function Profile({ user }: ProfileProps) {
  const username =
    (user.user_metadata.full_name as string | undefined) ?? user.email!;

  return (
    <div className="p-5 bg-neutral-100 border border-neutral-300 dark:border-neutral-700 shadow max-w-64 dark:bg-neutral-800 rounded-xl flex flex-col gap-4">
      <div className="flex flex-col gap-2.5">
        <Image
          className="rounded-full mx-auto"
          width={64}
          height={64}
          src={user.user_metadata.avatar_url as string}
          alt={`${username}님의 프로필 사진`}
        />
        <div className="flex flex-col">
          <div className="font-bold text-lg text-neutral-950 dark:text-neutral-50 text-center">
            {username}
          </div>
          <div className="font-medium text-sm text-neutral-600 dark:text-neutral-400 text-center">
            편집자
          </div>
        </div>
      </div>
      <LogoutButton />
    </div>
  );
}

import { createServerClient } from "@/libs/supabase/server";

import { Profile } from "@/components/profile/Profile";

import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div>
      <Profile user={user} />
    </div>
  );
}

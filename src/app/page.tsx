import { createServerClient } from "@/libs/supabase/server";

import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  redirect("/dashboard");

  return;
}

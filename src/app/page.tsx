"use client";

import { Button } from "@te6/ui";
import { LogIn } from "lucide-react";

export default function HomePage() {
  return <Button text="로그인" href="/auth" icon={LogIn} />;
}

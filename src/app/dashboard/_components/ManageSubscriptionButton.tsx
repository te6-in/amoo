"use client";

import { Button } from "@/components/Button";

import { Settings } from "lucide-react";

export function ManageSubscriptionButton() {
  return (
    <Button icon={Settings} text="아무 구독 관리" href="preferences" primary />
  );
}

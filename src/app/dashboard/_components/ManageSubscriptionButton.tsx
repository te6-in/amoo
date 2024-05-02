"use client";

import { Settings } from "lucide-react";

import { Button } from "@/components/Button";

export function ManageSubscriptionButton() {
  return (
    <Button icon={Settings} text="아무 구독 관리" href="preferences" primary />
  );
}

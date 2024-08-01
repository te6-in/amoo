"use client";

import { setSubscriptionStatus } from "@/app/dashboard/_actions/set-subscription-status";

import { Button } from "@/components/Button";

import { MailCheck, MailPlus } from "lucide-react";

import { useState } from "react";

import type { ReactElement } from "react";

interface SubscribeButtonProps<T> {
  elementToShowOnSuccess?: ReactElement<T>;
}

export function SubscribeButton<T>({
  elementToShowOnSuccess: ElementToShowOnSuccess,
}: SubscribeButtonProps<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (isSuccess && ElementToShowOnSuccess) {
    return ElementToShowOnSuccess;
  }

  const onClick = async () => {
    setIsLoading(true);

    const data = await setSubscriptionStatus({ status: true });

    if (data.status === 200) {
      setIsSuccess(true);
    }

    setIsLoading(false);
  };

  return (
    <Button
      icon={isSuccess ? MailCheck : MailPlus}
      text={isSuccess ? "구독 중" : "아무 뉴스레터 구독"}
      onClick={onClick}
      isLoading={isLoading}
      disabled={isSuccess}
      primary
    />
  );
}

"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { MailCheck, MailPlus, MailWarning } from "lucide-react";

import type { SubscribePostResponse } from "@/app/api/subscribe/route";

import { Button } from "@/components/ui/Button";

import type { ReactElement } from "react";

interface SubscribeButtonProps<T> {
  elementToShowOnSuccess?: ReactElement<T>;
}

export function SubscribeButton<T>({
  elementToShowOnSuccess: ElementToShowOnSuccess,
}: SubscribeButtonProps<T>) {
  const {
    mutate: subscribe,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: () => axios.post<SubscribePostResponse>("/api/subscribe"),
  });

  if (isSuccess && ElementToShowOnSuccess) {
    return ElementToShowOnSuccess;
  }

  return (
    <Button
      icon={isSuccess ? MailCheck : error ? MailWarning : MailPlus}
      text={
        isSuccess ? "구독 중" : error ? error.message : "아무 뉴스레터 구독"
      }
      onClick={() => subscribe()}
      isLoading={isPending}
      disabled={isSuccess || !!error}
      primary
    />
  );
}

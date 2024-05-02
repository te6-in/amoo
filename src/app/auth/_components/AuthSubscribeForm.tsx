"use client";

import { useForm } from "react-hook-form";

import { AuthForm } from "@/app/auth/_components/AuthForm/AuthForm";
import {
  SubscribeForm,
  type SubscribeFormValues,
} from "@/app/auth/_components/SubscribeForm";

export function AuthSubscribeForm() {
  const { register, getValues } = useForm<SubscribeFormValues>({
    defaultValues: {
      subscribe: true,
      subscribeToAds: false,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <AuthForm getValues={getValues} />
      <SubscribeForm register={register} />
    </div>
  );
}

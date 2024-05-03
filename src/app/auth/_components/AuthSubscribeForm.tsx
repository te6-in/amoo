"use client";

import { useForm } from "react-hook-form";

import { AuthForm } from "@/app/auth/_components/AuthForm";
import {
  SubscribeForm,
  type SubscribeFormValues,
} from "@/app/auth/_components/SubscribeForm";

interface AuthSubscribeFormProps {
  defaultValues?: SubscribeFormValues;
  redirectTo?: string;
}

export function AuthSubscribeForm({
  defaultValues,
  redirectTo,
}: AuthSubscribeFormProps) {
  const { register, getValues } = useForm<SubscribeFormValues>({
    defaultValues: defaultValues ?? {
      subscribe: true,
      subscribeToAds: false,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <AuthForm getValues={getValues} redirectTo={redirectTo} />
      <SubscribeForm register={register} />
    </div>
  );
}

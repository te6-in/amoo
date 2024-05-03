"use client";

import { type UseFormGetValues, useForm } from "react-hook-form";

import { emailAuth } from "@/app/auth/actions";

import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";

import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";

import { Mail } from "lucide-react";

import { useState } from "react";

interface EmailAuthFormProps {
  redirectTo?: string;
  getValues?: UseFormGetValues<SubscribeFormValues>;
}

export interface EmailAuthFormValues {
  email: string;
}

export function EmailAuthForm({ redirectTo, getValues }: EmailAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<EmailAuthFormValues>();

  const onValid = async (data: EmailAuthFormValues) => {
    setIsLoading(true);

    await emailAuth({
      formData: data,
      subscribeFormData: getValues
        ? getValues()
        : { subscribe: true, subscribeToAds: true },
      redirectTo,
    });
  };

  const trimmedEmail =
    watch("email") === undefined ? "" : watch("email").trim();

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-2">
      <TextInput
        name="email"
        type="email"
        title="이메일"
        placeholder="amoo@example.com"
        options={{
          required: "이메일을 입력해 주세요.",
          validate: (value: EmailAuthFormValues["email"]) =>
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
            "이메일을 정확하게 입력했는지 확인해주세요..",
          disabled: isLoading,
        }}
        register={register}
        error={errors.email?.message}
      />
      {trimmedEmail !== "" && (
        <Button
          text="인증 코드 받기"
          type="submit"
          disabled={!isValid}
          icon={Mail}
          primary
          isLoading={isLoading}
        />
      )}
    </form>
  );
}

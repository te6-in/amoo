"use client";

import { useForm } from "react-hook-form";

import { verifyOtp } from "@/app/auth/actions";

import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";

import { Button } from "@/components/Button";
import { TextInput } from "@/components/TextInput";

import { Check } from "lucide-react";

import { useState } from "react";

interface OtpFormProps {
  email: string;
  redirectTo?: string;
  subscribeFormData: SubscribeFormValues;
}

export interface OtpFormValues {
  otp: string;
}

export function OtpForm({
  email,
  redirectTo,
  subscribeFormData,
}: OtpFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<OtpFormValues>();

  const onValid = async (data: OtpFormValues) => {
    setIsLoading(true);

    await verifyOtp({
      formData: data,
      subscribeFormData,
      email,
      redirectTo,
    });
  };

  const trimmedOtp = watch("otp") === undefined ? "" : watch("otp").trim();

  return (
    <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-2">
      <TextInput
        name="otp"
        type="otp"
        title="인증 코드"
        placeholder="123456"
        options={{
          required: "인증 코드를 입력해 주세요.",
          validate: (value: OtpFormValues["otp"]) =>
            /^[0-9]{6}$/.test(value) || "인증 코드는 6자리 숫자입니다.",
          disabled: isLoading,
        }}
        register={register}
        error={errors.otp?.message}
      />
      <Button
        text="완료"
        type="submit"
        disabled={!isValid}
        icon={Check}
        primary={trimmedOtp !== ""}
        isLoading={isLoading}
      />
    </form>
  );
}

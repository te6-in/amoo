"use client";

import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";

import { auth } from "@/components/auth/actions";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";

import { useState } from "react";

interface EmailAuthFormProps {
  redirectTo?: string;
}

export interface EmailAuthFormValues {
  email: string;
}

export function EmailAuthForm({ redirectTo }: EmailAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<EmailAuthFormValues>();

  const onValid = async (data: EmailAuthFormValues) => {
    setIsLoading(true);

    await auth({ formData: data, redirectTo });
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

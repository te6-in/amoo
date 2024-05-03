"use client";

import { useForm } from "react-hook-form";

import { setUsername } from "@/app/auth/username/_actions/set-username";

import { Button } from "@/components/Button";
import { DividerWithLabel } from "@/components/DividerWithLabel";
import { TextInput } from "@/components/TextInput";

import { Check } from "lucide-react";

import { useState } from "react";

interface UsernameFormProps {
  redirectTo?: string;
}

export interface UsernameFormValues {
  // use `name` to indicate `username`
  // for password managers not to autofill the field
  name: string;
}

export function UsernameForm({ redirectTo }: UsernameFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<UsernameFormValues>();

  const onValid = async (formData: UsernameFormValues) => {
    setIsLoading(true);

    const data = await setUsername({ formData, redirectTo });

    if (data?.error) {
      // TODO: handle error
    }
  };

  const trimmedUsername =
    watch("name") === undefined ? "" : watch("name").trim();

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-2">
        <TextInput
          name="name"
          type="text"
          title="별명"
          placeholder="아무"
          options={{
            required: "별명을 입력해 주세요.",
            disabled: isLoading,
            validate: (value: UsernameFormValues["name"]) =>
              value.trim() !== "" || "별명을 입력해 주세요.",
          }}
          register={register}
          error={errors.name?.message}
        />
        {trimmedUsername !== "" && (
          <Button
            text={`${trimmedUsername}님이라 불러주세요`}
            type="submit"
            disabled={!isValid}
            icon={Check}
            primary={trimmedUsername !== ""}
            isLoading={isLoading}
          />
        )}
      </form>
      <DividerWithLabel />
      <Button text="나중에 설정" href="/dashboard" />
    </div>
  );
}

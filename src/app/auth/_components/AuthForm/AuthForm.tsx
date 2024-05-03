import type { UseFormGetValues } from "react-hook-form";

import { EmailAuthForm } from "@/app/auth/_components/AuthForm/EmailAuthForm";
import { GitHubAuthButton } from "@/app/auth/_components/AuthForm/GitHubAuthButton";
import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";

import { DividerWithLabel } from "@/components/DividerWithLabel";

interface AuthFormProps {
  redirectTo?: string;
  getValues?: UseFormGetValues<SubscribeFormValues>;
}
export function AuthForm({ redirectTo, getValues }: AuthFormProps) {
  return (
    <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col gap-4">
      <EmailAuthForm redirectTo={redirectTo} getValues={getValues} />
      <DividerWithLabel className="bg-neutral-50 dark:bg-neutral-950" />
      <GitHubAuthButton redirectTo={redirectTo} getValues={getValues} />
    </div>
  );
}

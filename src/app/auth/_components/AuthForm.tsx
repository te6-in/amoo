import type { UseFormGetValues } from "react-hook-form";

import type { SubscribeFormValues } from "@/app/auth/_components/SubscribeForm";
import { EmailAuthForm } from "@/app/auth/_components/methods/EmailAuthForm";
import { GitHubAuthButton } from "@/app/auth/_components/methods/GitHubAuthButton";

import { DividerWithLabel } from "@/components/DividerWithLabel";

interface AuthFormProps {
  redirectTo?: string;
  getValues?: UseFormGetValues<SubscribeFormValues>;
}
export function AuthForm({ redirectTo, getValues }: AuthFormProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
      <EmailAuthForm redirectTo={redirectTo} getValues={getValues} />
      <DividerWithLabel className="bg-neutral-50 dark:bg-neutral-950" />
      <GitHubAuthButton redirectTo={redirectTo} getValues={getValues} />
    </div>
  );
}

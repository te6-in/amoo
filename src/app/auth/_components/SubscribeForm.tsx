import type { UseFormRegister } from "react-hook-form";

import { Checkbox } from "@/components/Checkbox";

export interface SubscribeFormValues {
  subscribe: boolean;
  subscribeToAds: boolean;
}

interface SubscribeFormProps {
  register: UseFormRegister<SubscribeFormValues>;
}

export function SubscribeForm({ register }: SubscribeFormProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950">
      <Checkbox
        register={register}
        name="subscribe"
        title="아무 뉴스레터 구독"
        description="구독하지 않고 계신 경우 구독하게 됩니다."
      />
      <Checkbox
        register={register}
        name="subscribeToAds"
        title="광고성 정보 수신 동의"
        description="광고성 정보를 동의하지 않고 계신 경우 동의하게 됩니다."
      />
    </div>
  );
}

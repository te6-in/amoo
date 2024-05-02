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
    <div className="p-4 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex flex-col gap-2.5">
      <Checkbox
        register={register}
        name="subscribe"
        title="아무 뉴스레터 구독"
        description="아무 내용이나 보내드립니다."
      />
      <Checkbox
        register={register}
        name="subscribeToAds"
        title="광고성 정보 수신 동의"
        description="아무가 광고를 받게 되는 날이 올까요? 이 항목을 체크하시면 그 날을 함께 기념할 수 있습니다."
      />
    </div>
  );
}

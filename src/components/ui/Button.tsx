"use client";

import { Button as BaseButton } from "@te6/ui";

import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<typeof BaseButton>;

export function Button(props: ButtonProps) {
  return <BaseButton {...props} />;
}

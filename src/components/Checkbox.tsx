"use client";

import { Checkbox as BaseCheckbox } from "@te6/ui";
import type { FieldValues } from "react-hook-form";

import type { ComponentPropsWithoutRef } from "react";

type CheckboxProps<T extends FieldValues> = ComponentPropsWithoutRef<
  typeof BaseCheckbox<T>
>;

export function Checkbox<T extends FieldValues>(props: CheckboxProps<T>) {
  return <BaseCheckbox<T> {...props} />;
}

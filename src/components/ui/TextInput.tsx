"use client";

import { TextInput as BaseTextInput } from "@te6/ui";
import type { FieldValues } from "react-hook-form";

import type { ComponentPropsWithoutRef } from "react";

type TextInputProps<T extends FieldValues> = ComponentPropsWithoutRef<
  typeof BaseTextInput<T>
>;

export function TextInput<T extends FieldValues>(props: TextInputProps<T>) {
  return <BaseTextInput<T> {...props} />;
}

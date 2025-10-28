import React from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";

export type BasicFormFieldProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  placeholder?: string;
  label?: React.ReactNode;
  required?: boolean;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
  disabled?: boolean;
};

export default function BasicFormField<T extends FieldValues = FieldValues>({
  name,
  placeholder,
  label,
  required = false,
  type = "text",
  className,
  disabled = false,
}: BasicFormFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      disabled={disabled}
      key={String(name)}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className={clsx(className)}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

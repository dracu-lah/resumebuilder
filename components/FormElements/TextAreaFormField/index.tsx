import React from "react";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export type TextAreaFormFieldProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  placeholder?: string;
  label?: React.ReactNode;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  rows?: number;
};

export default function TextAreaFormField<T extends FieldValues = FieldValues>({
  name,
  placeholder,
  label,
  required = false,
  className,
  disabled = false,
  rows = 3,
}: TextAreaFormFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
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
            <Textarea
              rows={rows}
              disabled={disabled}
              placeholder={placeholder}
              {...field}
              className={className}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

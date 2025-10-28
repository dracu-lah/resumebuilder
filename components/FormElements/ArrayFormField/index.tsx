import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import BasicFormField from "@/components/FormElements/BasicFormField";
import TextAreaFormField from "@/components/FormElements/TextAreaFormField";
import {
  useFormContext,
  FieldValues,
  Path,
  UseFieldArrayReturn,
  ArrayPath,
} from "react-hook-form";

type ArrayFieldComponentProps<T extends FieldValues = FieldValues> = {
  fieldArray: UseFieldArrayReturn<T, ArrayPath<T>>;
  name: Path<T>;
  placeholder?: string;
  label?: string;
  type?: "input" | "textarea";
  rows?: number;
};

export default function ArrayFieldComponent<
  T extends FieldValues = FieldValues,
>({
  fieldArray,
  name,
  placeholder,
  label = "",
  type = "input",
  rows = 3,
}: ArrayFieldComponentProps<T>) {
  const {
    formState: { errors },
  } = useFormContext<T>();

  const getFieldError = (index: number) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ((errors as any)?.[String(name)]?.[index]?.message as string | undefined) ??
    undefined;

  return (
    <div key={String(name)} className="space-y-2">
      {label && <span className="text-sm font-medium">{label}</span>}

      {fieldArray.fields.map((field, index) => {
        const fieldError = getFieldError(index);
        const fieldPath = `${String(name)}.${index}` as Path<T>;

        return (
          <div key={field.id} className="flex flex-col gap-1">
            <div className="flex gap-2 items-start">
              {type === "input" ? (
                <BasicFormField<T>
                  name={fieldPath}
                  placeholder={placeholder}
                  type="text"
                />
              ) : (
                <TextAreaFormField<T>
                  name={fieldPath}
                  placeholder={placeholder}
                  rows={rows}
                />
              )}

              {fieldArray.fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fieldArray.remove(index)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>

            {fieldError && (
              <span className="text-xs text-red-500 ml-1">{fieldError}</span>
            )}
          </div>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => fieldArray.append("" as any)}
      >
        <Plus className="h-4 w-4 mr-2" />
        {`Add ${label ? label.replace(/s$/i, "") : "item"}`}
      </Button>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import BasicFormField from "@/components/FormElements/BasicFormField";
import TextAreaFormField from "@/components/FormElements/TextAreaFormField";
import { useFormContext, FieldErrors, useFieldArray } from "react-hook-form";

interface ArrayFieldComponentProps {
  name: string;
  placeholder?: string;
  label: string;
  type?: "input" | "textarea";
  rows?: number;
}

const ArrayFieldComponent: React.FC<ArrayFieldComponentProps> = ({
  name,
  placeholder = "",
  label,
  type = "input",
  rows = 3,
}) => {
  const form = useFormContext();

  const arrayFields = useFieldArray({
    control: form.control,
    name,
  });

  return (
    <div key={name} className="space-y-2">
      <span className="text-sm font-medium">{label}</span>
      {arrayFields.fields.map((field, index) => {
        const fieldError = (form.formState.errors?.[name] as FieldErrors)?.[
          index
        ]?.message as string | undefined;
        return (
          <div key={field.id} className="flex flex-col gap-1">
            <div className="flex gap-2 items-start">
              {type === "input" ? (
                <BasicFormField
                  name={`${name}.${index}`}
                  placeholder={placeholder}
                  type="text"
                />
              ) : (
                <TextAreaFormField
                  name={`${name}.${index}`}
                  placeholder={placeholder}
                  rows={rows}
                />
              )}
              {arrayFields.fields.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => arrayFields.remove(index)}
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
        onClick={() => arrayFields.append("")}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add {label.slice(0, -1)}
      </Button>
    </div>
  );
};

export default ArrayFieldComponent;

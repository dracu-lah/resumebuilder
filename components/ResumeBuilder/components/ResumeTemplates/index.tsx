import { Button } from "@/components/ui/button";
import ResumePreviewPage1 from "@/components/ResumeBuilder/components/ResumePreviews/ResumePreview1";
import ResumePreviewPage2 from "@/components/ResumeBuilder/components/ResumePreviews/ResumePreview2";
import ResumePreviewPage3 from "@/components/ResumeBuilder/components/ResumePreviews/ResumePreview3";
import ResumePreviewPage4 from "@/components/ResumeBuilder/components/ResumePreviews/ResumePreview4";
import ResumePreviewPage5 from "@/components/ResumeBuilder/components/ResumePreviews/ResumePreview5";
import { Dispatch, JSX, SetStateAction } from "react";
export type Template = {
  label: string;
  Component: JSX.Element;
};
export const templates: Template[] = [
  {
    label: "Template 1 [Default]",
    Component: <ResumePreviewPage1 />,
  },
  {
    label: "Template 2 [FAANG inspired]",
    Component: <ResumePreviewPage2 />,
  },

  {
    label: "Template 3",
    Component: <ResumePreviewPage3 />,
  },

  {
    label: "Template 4",
    Component: <ResumePreviewPage4 />,
  },

  {
    label: "Template 5 [With image]",
    Component: <ResumePreviewPage5 />,
  },
];

const ResumeTemplates = ({
  template,
  setTemplate,
}: {
  template: string;
  setTemplate: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className=" flex   flex-col justify-center items-center  gap-2">
      <h1 className="text-xl font-semibold">Available Templates</h1>
      <div className="flex flex-col overflow-auto w-full justify-center md:flex-row gap-2 ">
        {templates.map((temp, key) => (
          <Button
            key={key}
            variant={template === temp.label ? "default" : "outline"}
            onClick={() => setTemplate(temp.label)}
          >
            {temp.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;

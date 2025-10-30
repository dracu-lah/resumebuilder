import { useState } from "react";
import ResumeFormPage from "@/components/ResumeBuilder/components/ResumeForm";
import { Resume } from "./components/ResumeForm/resumeSchema";
import ResumeTemplates, { templates } from "./components/ResumeTemplates";
import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import ResumeScaffold from "./components/ResumePreviews/components/ResumeScaffold";

export default function ResumeBuilder() {
  const [viewMode, setViewMode] = useState<"preview" | "edit">("edit");
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [template, setTemplate] = useState<string>(templates[0].label);

  if (viewMode === "preview" && resumeData) {
    return (
      <div>
        <div className="p-4  space-y-4">
          <Button
            onClick={() => setViewMode("edit")}
            variant="outline"
            className="w-full md:w-80"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Resume
          </Button>
          <ResumeTemplates template={template} setTemplate={setTemplate} />
        </div>

        <ResumeScaffold resumeData={resumeData}>
          <div>{templates.find((t) => t.label === template)?.Component}</div>
        </ResumeScaffold>
      </div>
    );
  }

  return (
    <ResumeFormPage setResumeData={setResumeData} setViewMode={setViewMode} />
  );
}

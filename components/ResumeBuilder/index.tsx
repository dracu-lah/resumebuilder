import { useState } from "react";
import ResumeFormPage from "@/components/ResumeBuilder/components/ResumeForm";
import { Resume } from "./components/ResumeForm/resumeSchema";
import ResumeTemplates, { templates } from "./components/ResumeTemplates";
import ResumeScaffold from "./components/ResumePreviews/components/ResumeScaffold";
export type ViewModeType = "preview" | "edit";
export default function ResumeBuilder() {
  const [viewMode, setViewMode] = useState<ViewModeType>("edit");
  const [resumeData, setResumeData] = useState<Resume | null>(null);
  const [template, setTemplate] = useState<string>(templates[0].label);

  if (viewMode === "preview" && resumeData) {
    return (
      <div>
        <div className="p-4 bg-card  space-y-4">
          <ResumeTemplates template={template} setTemplate={setTemplate} />
        </div>

        <ResumeScaffold resumeData={resumeData} setViewMode={setViewMode}>
          <div>{templates.find((t) => t.label === template)?.Component}</div>
        </ResumeScaffold>
      </div>
    );
  }

  return (
    <ResumeFormPage setResumeData={setResumeData} setViewMode={setViewMode} />
  );
}

import { useReactToPrint } from "react-to-print";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

import { Edit } from "lucide-react";
import { DownloadJSONButton } from "@/components/ResumeBuilder/components/DownloadJSONButton";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { defaultValues, Resume } from "../../../ResumeForm/resumeSchema";
import { ViewModeType } from "@/components/ResumeBuilder";
type ResumeFormType = {
  resumeData: Resume;
  children: ReactNode;
  setViewMode: Dispatch<SetStateAction<ViewModeType>>;
};

type ContextType = {
  resumeData: Resume;
  showLinks: boolean;
};
const ResumeContext = createContext<ContextType>({
  resumeData: defaultValues,
  showLinks: false,
});

const ResumeScaffold = ({
  children,
  resumeData,
  setViewMode,
}: ResumeFormType) => {
  const [showLinks, setShowLinks] = useState(false);
  const [isDesignMode, setIsDesignMode] = useState(false);
  const contentRef = useRef(null);

  const documentTitle =
    `${resumeData.personalInfo.name} ${resumeData.personalInfo.title} Resume`.replaceAll(
      " ",
      "-",
    );

  const reactToPrintFn = useReactToPrint({
    contentRef,
    preserveAfterPrint: true,
    pageStyle: `
      @page { size: A4; margin: 0.5in; }
      @media print {
        .resume-container {  margin:0; padding:0; width:100%  }
      }
    `,
    documentTitle,
  });

  return (
    <div className="min-h-screen ">
      <div className="sticky top-0  bg-card z-40  shadow-sm pb-4 px-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Default Resume Preview</h1>

          <div className="flex gap-2 flex-col md:flex-row">
            <div className="flex gap-2 flex-row">
              <Button onClick={reactToPrintFn}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <DownloadJSONButton data={resumeData} />
            </div>
            <Button onClick={() => setViewMode("edit")} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Resume
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center space-x-2">
            <Switch
              id="show-links"
              checked={showLinks}
              onCheckedChange={setShowLinks}
            />
            <Label htmlFor="show-links">Show Links</Label>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <Switch
              id="design-mode"
              checked={isDesignMode}
              onCheckedChange={(e) => {
                setIsDesignMode(e);
                if (e) toast.info("These changes won't be persisted!");
              }}
            />
            <Label htmlFor="design-mode">Live Text Edit Mode</Label>
          </div>
        </div>
      </div>

      <div className="p-4 overflow-scroll">
        <div
          ref={contentRef}
          contentEditable={isDesignMode}
          className="bg-white p-[0.5in]  w-[210mm]    resume-container mx-auto text-black"
          style={{
            fontFamily: 'Georgia, "Times New Roman", Times, serif',
            fontSize: "11pt",
            lineHeight: 1.35,
            color: "#111",
          }}
        >
          <ResumeContext value={{ resumeData, showLinks }}>
            {children}
          </ResumeContext>
        </div>
      </div>
    </div>
  );
};

export const useResume = () => useContext(ResumeContext);
export default ResumeScaffold;

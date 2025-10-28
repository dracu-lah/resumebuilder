import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import pdfToText from "react-pdftotext";
import { GoogleGenAI } from "@google/genai";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, Key, AlertCircle, CheckCircle2 } from "lucide-react";
import { defaultValues } from "../../resumeSchema";

const pdfSchema = z.object({
  pdfFile: z
    .any()
    .refine(
      (file) =>
        file && file.length === 1 && file[0]?.type === "application/pdf",
      {
        message: "Please upload a valid PDF file",
      },
    ),
});

const tokenSchema = z.object({
  apiKey: z.string().min(10, "API key must be at least 10 characters"),
});

type PdfForm = { pdfFile: FileList };
type TokenForm = { apiKey: string };

type OldResumeUploadProps = {
  onUpload?: (data: Record<string, any>) => void;
};

const OldResumeUpload: React.FC<OldResumeUploadProps> = ({ onUpload }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<
    "upload" | "token" | "processing" | "success"
  >("upload");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [needsToken, setNeedsToken] = useState(false);
  const [extractedText, setExtractedText] = useState("");

  const pdfForm = useForm<PdfForm>({ resolver: zodResolver(pdfSchema) });
  const tokenForm = useForm<TokenForm>({ resolver: zodResolver(tokenSchema) });

  const resetModal = () => {
    setStep("upload");
    setLoading(false);
    setError(null);
    setNeedsToken(false);
    setExtractedText("");
    pdfForm.reset();
    tokenForm.reset();
  };

  const handleClose = () => {
    setOpen(false);
    resetModal();
  };

  /**
   * Call Gemini (GoogleGenAI) to convert extracted text -> JSON following defaultValues schema.
   * Returns parsed JSON object or throws an Error.
   */
  const parseResumeWithGemini = async (
    text: string,
    apiKey: string,
  ): Promise<Record<string, any>> => {
    const genAI = new GoogleGenAI({ apiKey });

    const prompt = `
Extract this resume text and return JSON in the following schema. Ensure the output is *only* the JSON, with no introductory or concluding text, and that it is a valid JSON string. The JSON should be wrapped in a Markdown code block like this:
\`\`\`json
{ /* ... your JSON ... */ }
\`\`\`

${JSON.stringify(defaultValues, null, 2)}

Resume Text:
${text}
    `.trim();

    const result = await genAI.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: prompt,
    });

    const candidate =
      (result?.candidates?.[0]?.content?.parts?.[0]?.text ??
      typeof result === "string")
        ? (result as unknown as string)
        : undefined;

    if (!candidate || typeof candidate !== "string") {
      throw new Error("Empty response from Gemini");
    }

    // try to extract JSON inside ```json ... ``` block
    const jsonMatch = candidate.match(/```json\s*([\s\S]*?)\s*```/i);
    const raw = jsonMatch ? jsonMatch[1] : candidate;

    // attempt to find first { ... } block if candidate contains extra text
    const firstBraceIndex = raw.indexOf("{");
    const lastBraceIndex = raw.lastIndexOf("}");
    if (firstBraceIndex === -1 || lastBraceIndex === -1) {
      throw new Error("No JSON object found in Gemini response");
    }

    const jsonText = raw.slice(firstBraceIndex, lastBraceIndex + 1);

    try {
      return JSON.parse(jsonText);
    } catch (err) {
      // include the original snippet to help debugging
      const snippet = jsonText.slice(0, 1000);
      throw new Error(
        `Failed to parse JSON from model response. Snippet: ${snippet}`,
      );
    }
  };

  const handlePdfSubmit = async (
    e?: React.FormEvent | React.MouseEvent,
  ): Promise<void> => {
    e?.preventDefault?.();

    const valid = await pdfForm.trigger();
    if (!valid) return;

    const fileList = pdfForm.getValues().pdfFile;
    const file = fileList?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    setStep("processing");

    try {
      // extract text from PDF (may throw)
      // react-pdftotext may have an any-typed default; cast result to string
      const text = (await pdfToText(file)) as string;
      setExtractedText(text);

      const envApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY as
        | string
        | undefined;

      if (envApiKey) {
        try {
          const parsedData = await parseResumeWithGemini(text, envApiKey);
          onUpload?.(parsedData);
          setStep("success");
          setTimeout(() => handleClose(), 1500);
          return;
        } catch (apiError: any) {
          // if API key related, fall through to request token
          const msg = apiError?.message ?? String(apiError);
          console.error("API Error:", apiError);
          if (/400|401|403|API_KEY/i.test(msg)) {
            setNeedsToken(true);
            setStep("token");
            setError(null);
            return;
          }
          throw apiError;
        }
      } else {
        setNeedsToken(true);
        setStep("token");
      }
    } catch (err: any) {
      console.error("Error processing PDF:", err);
      const message =
        (err?.message && String(err.message)) ||
        "Failed to process the PDF file. Please try again.";
      setError(
        message.includes("429")
          ? "Rate limit reached. Please try again later."
          : message,
      );
      setStep("upload");
    } finally {
      setLoading(false);
    }
  };

  const handleTokenSubmit = async (
    e?: React.FormEvent | React.MouseEvent,
  ): Promise<void> => {
    e?.preventDefault?.();

    const valid = await tokenForm.trigger();
    if (!valid) return;

    const formData = tokenForm.getValues();
    setLoading(true);
    setError(null);
    setStep("processing");

    try {
      const parsedData = await parseResumeWithGemini(
        extractedText,
        formData.apiKey,
      );
      onUpload?.(parsedData);
      setStep("success");
      setTimeout(() => handleClose(), 1500);
    } catch (err: any) {
      console.error("Token Error:", err);
      const msg = err?.message ? String(err.message) : "Unknown error";
      if (/400|401|403/.test(msg)) {
        setError("Invalid API key. Please check your Google Gemini API key.");
      } else if (/429/.test(msg)) {
        setError("Rate limit reached. Please try again later.");
      } else {
        setError(
          "Failed to parse resume. Please check your API key and try again.",
        );
      }
      setStep("token");
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "upload":
        return (
          <div className="space-y-4">
            <div className="text-center py-6">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Upload a PDF resume to extract and parse its content using
                Google Gemini AI
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="pdfFile">Resume File (PDF)</Label>
                <Input
                  id="pdfFile"
                  type="file"
                  accept="application/pdf"
                  {...pdfForm.register("pdfFile")}
                  className="mt-1"
                />
                {pdfForm.formState.errors.pdfFile && (
                  <p className="text-sm text-destructive mt-1">
                    {String(pdfForm.formState.errors.pdfFile.message)}
                  </p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePdfSubmit}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Processing..." : "Parse Resume"}
                </Button>
              </div>
            </div>
          </div>
        );

      case "token":
        return (
          <div className="space-y-4">
            <div className="text-center py-4">
              <Key className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                {needsToken
                  ? "API key expired or invalid. Please enter your Google Gemini API key:"
                  : "Please enter your Google Gemini API key to continue:"}
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Get your free API key from{" "}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-primary"
                >
                  Google AI Studio
                </a>
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <Label htmlFor="apiKey">Google Gemini API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="AIzaSy..."
                  {...tokenForm.register("apiKey")}
                  className="mt-1"
                />
                {tokenForm.formState.errors.apiKey && (
                  <p className="text-sm text-destructive mt-1">
                    {String(tokenForm.formState.errors.apiKey.message)}
                  </p>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep("upload")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleTokenSubmit}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? "Processing..." : "Upload"}
                </Button>
              </div>
            </div>
          </div>
        );

      case "processing":
        return (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-lg font-medium">Processing Resume...</p>
            <p className="text-sm text-muted-foreground">
              Extracting and parsing content with Google Gemini AI
            </p>
          </div>
        );

      case "success":
        return (
          <div className="text-center py-12">
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <p className="text-lg font-medium text-green-600">
              Resume Parsed Successfully!
            </p>
            <p className="text-sm text-muted-foreground">
              The parsed data has been extracted and processed.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <FileText className="h-4 w-4" />
          Upload Resume (AI)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Resume Parser
          </DialogTitle>
        </DialogHeader>
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  );
};

export default OldResumeUpload;

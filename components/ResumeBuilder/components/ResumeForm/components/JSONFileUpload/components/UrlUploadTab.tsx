import React, { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Loader2, History } from "lucide-react";
import { fetchRemoteJson } from "./utils";
import { Resume } from "../../../resumeSchema";

export type UrlUploadTabProps = {
  remoteUrl: string;
  setRemoteUrl: (v: string) => void;
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  setError: (msg: string | null) => void;
  setSuccess: (ok: boolean) => void;
  setUploadedData: (data: Resume | null) => void;
  savedUrls: string[];
  setSavedUrls: (urls: string[]) => void;
  onUpload?: (data: Resume) => void;
};

export default function UrlUploadTab({
  remoteUrl,
  setRemoteUrl,
  isLoading,
  setIsLoading,
  setError,
  setSuccess,
  setUploadedData,
  savedUrls,
  setSavedUrls,
  onUpload,
}: UrlUploadTabProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = remoteUrl.trim();
    if (trimmed) {
      fetchRemoteJson(
        trimmed,
        setIsLoading,
        setError,
        setSuccess,
        setUploadedData,
        setSavedUrls,
        onUpload,
      );
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="remote-url">Remote JSON URL (HTTPS only)</Label>
          <div className="flex gap-2">
            <Input
              id="remote-url"
              type="url"
              placeholder="https://example.com/resume.json"
              value={remoteUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRemoteUrl(e.target.value)
              }
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={!remoteUrl.trim() || isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Globe className="h-4 w-4" />
              )}
              {isLoading ? "Fetching..." : "Fetch"}
            </Button>
          </div>
        </div>
      </form>

      {savedUrls.length > 0 && (
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <History className="h-4 w-4" /> Recently Used URLs
          </Label>
          <div className="max-h-32 overflow-y-auto space-y-1">
            {savedUrls.map((url, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="w-100 overflow-hidden justify-start text-left h-auto p-2 text-xs"
                onClick={() =>
                  fetchRemoteJson(
                    url,
                    setIsLoading,
                    setError,
                    setSuccess,
                    setUploadedData,
                    setSavedUrls,
                    onUpload,
                  )
                }
                disabled={isLoading}
              >
                <Globe className="h-3 w-3 mr-2 shrink-0" />
                <span className="truncate">{url}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

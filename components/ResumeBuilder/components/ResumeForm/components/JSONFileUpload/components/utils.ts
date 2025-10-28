import { z } from "zod";
import { resumeSchema, defaultValues } from "../../../resumeSchema";

export const STORAGE_KEY = "resume-upload-urls";

export type Resume = z.infer<typeof resumeSchema>;

type SetError = (msg: string | null) => void;
type SetSuccess = (ok: boolean) => void;
type SetUploadedData = (data: Resume | null) => void;
type SetSavedUrls = (urls: string[]) => void;
type SetIsLoading = (v: boolean) => void;
type OnUpload = (data: Resume) => void;

/**
 * Deep-merge `source` into `target` while:
 *  - replacing arrays entirely if source provides them
 *  - preserving primitive values if source doesn't provide them
 *
 * This is intentionally permissive so it can be used with partial JSON uploads.
 */
export const deepMerge = <T = any>(
  target: T,
  source: Partial<T> | undefined,
): T => {
  if (Array.isArray(target)) {
    return (source && Array.isArray(source) ? source : target) as unknown as T;
  }

  if (typeof target === "object" && target !== null) {
    const out: Record<string, any> = {};
    const targetKeys = Object.keys(target as Record<string, any>);
    for (const key of targetKeys) {
      const tVal = (target as Record<string, any>)[key];
      const sVal = source && (source as Record<string, any>)[key];
      out[key] = key in (source ?? {}) ? deepMerge(tVal, sVal) : tVal;
    }
    return out as unknown as T;
  }

  return (source !== undefined ? source : target) as unknown as T;
};

/** Persist a recent URL list (max 10) into localStorage and call setSavedUrls */
export const saveUrlToStorage = (url: string, setSavedUrls?: SetSavedUrls) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved: string[] = raw ? JSON.parse(raw) : [];
    const filtered = saved.filter((u) => u !== url);
    const updated = [url, ...filtered].slice(0, 10);
    setSavedUrls?.(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    // Non-fatal: just log
    // eslint-disable-next-line no-console
    console.error("Failed to save URL:", err);
  }
};

/** Validate merged data with zod and propagate results via callbacks */
export const validateAndProcessData = (
  jsonData: unknown,
  setError: SetError,
  setSuccess: SetSuccess,
  setUploadedData: SetUploadedData,
  onUpload?: OnUpload,
) => {
  try {
    setError(null);
    setSuccess(false);

    const merged = deepMerge<Resume>(
      defaultValues as Resume,
      jsonData as Partial<Resume>,
    );

    // safeParse to allow partial/missing fields but check structure
    const result = resumeSchema.safeParse(merged);

    if (!result.success) {
      // keep merged values but warn user
      // eslint-disable-next-line no-console
      console.warn("Validation warnings:", result.error.format());
      setUploadedData(merged as Resume);
      setSuccess(true);
      setError(null);
      if (onUpload) onUpload(merged as Resume);
      return;
    }

    // fully valid
    setUploadedData(result.data);
    setSuccess(true);
    setError(null);
    if (onUpload) onUpload(result.data);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    setError(msg);
    setSuccess(false);
    setUploadedData(null);
  }
};

/** Read a File (JSON) and validate its contents */
export const validateAndProcessFile = async (
  file: File,
  setError: SetError,
  setSuccess: SetSuccess,
  setUploadedData: SetUploadedData,
  onUpload?: OnUpload,
) => {
  try {
    setError(null);
    setSuccess(false);

    if (
      file.type !== "application/json" &&
      !file.name.toLowerCase().endsWith(".json")
    ) {
      throw new Error("Please upload a JSON file");
    }

    const text = await file.text();
    const jsonData = JSON.parse(text);

    validateAndProcessData(
      jsonData,
      setError,
      setSuccess,
      setUploadedData,
      onUpload,
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    setError(msg);
    setSuccess(false);
    setUploadedData(null);
  }
};

/** Fetch a remote JSON, validate and optionally save the URL to localStorage */
export const fetchRemoteJson = async (
  url: string,
  setIsLoading: SetIsLoading,
  setError: SetError,
  setSuccess: SetSuccess,
  setUploadedData: SetUploadedData,
  setSavedUrls?: SetSavedUrls,
  onUpload?: OnUpload,
  timeoutMs = 10_000,
) => {
  setIsLoading(true);
  setError(null);
  setSuccess(false);

  let controller: AbortController | null = null;
  let timeoutId: number | undefined;

  try {
    const validUrl = new URL(url);
    if (validUrl.protocol !== "https:") {
      throw new Error("Only HTTPS URLs are allowed");
    }

    controller = new AbortController();
    timeoutId = window.setTimeout(() => controller?.abort(), timeoutMs);

    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`,
      );
    }

    const jsonData = await response.json();
    validateAndProcessData(
      jsonData,
      setError,
      setSuccess,
      setUploadedData,
      onUpload,
    );
    saveUrlToStorage(url, setSavedUrls);
  } catch (err: unknown) {
    // Normalize AbortError
    const isAbort = (err as any)?.name === "AbortError";
    const msg = isAbort
      ? "Request timed out"
      : err instanceof Error
        ? err.message
        : String(err);
    setError(msg);
    setSuccess(false);
    setUploadedData(null);
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
    setIsLoading(false);
  }
};

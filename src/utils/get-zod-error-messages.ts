import { ZodFormattedError } from "zod";

export function getZodErrorMessages<T>(
  error: ZodFormattedError<T>
): string[] {
  return Object.values(error)
    .flatMap((field) => (field && typeof field === "object" && "_errors" in field) ? field._errors : [])
    .filter(Boolean);
}
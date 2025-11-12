export function parseImages(images: unknown): string[] {
  if (Array.isArray(images)) return images as string[];

  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) return parsed as string[];
      return [];
    } catch {
      return [];
    }
  }

  return [];
}

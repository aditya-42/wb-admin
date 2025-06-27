export function getMediaUrl(
  fileName: string,
  mediaType?: string
): { uri: string } | null {
  if (!fileName) return null;

  if (fileName.startsWith("http")) {
    return { uri: fileName };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!baseUrl) {
    console.warn("Missing NEXT_PUBLIC_SUPABASE_URL env variable");
    return null;
  }

  const folder = mediaType?.startsWith("video") ? "postVideos" : "postImages";
  const uri = `${baseUrl}/storage/v1/object/public/uploads/${folder}/${fileName}`;
  return { uri };
}

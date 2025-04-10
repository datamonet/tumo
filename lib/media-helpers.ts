import { MediaType } from "./media-storage";

// Map of media types to MIME types
const mimeTypeMap = {
  [MediaType.IMAGE]: "image/png",
  [MediaType.AUDIO]: "audio/mp3",
  [MediaType.VIDEO]: "video/mp4",
  [MediaType.MODEL]: "model/gltf-binary",
  [MediaType.OTHER]: "application/octet-stream",
};

// Map of media types to file extensions
const extensionMap = {
  [MediaType.IMAGE]: ".png",
  [MediaType.AUDIO]: ".mp3",
  [MediaType.VIDEO]: ".mp4",
  [MediaType.MODEL]: ".glb",
  [MediaType.OTHER]: ".bin",
};

export const mediaHelpers = {
  base64ToBlob: (base64Data: string, mediaType: MediaType = MediaType.IMAGE): Blob => {
    const mimeType = mimeTypeMap[mediaType] || "application/octet-stream";
    const byteString = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: mimeType });
  },

  generateMediaFileName: (provider: string, mediaType: MediaType = MediaType.IMAGE): string => {
    const uniqueId = Math.random().toString(36).substring(2, 8);
    return `${provider}-${uniqueId}`.replace(/[^a-z0-9-]/gi, "");
  },

  shareOrDownload: async (
    base64Data: string,
    provider: string,
    mediaType: MediaType = MediaType.IMAGE
  ): Promise<void> => {
    const fileName = mediaHelpers.generateMediaFileName(provider, mediaType);
    const blob = mediaHelpers.base64ToBlob(base64Data, mediaType);
    const extension = extensionMap[mediaType] || ".bin";
    const mimeType = mimeTypeMap[mediaType] || "application/octet-stream";
    const file = new File([blob], `${fileName}${extension}`, { type: mimeType });

    try {
      if (navigator.share) {
        await navigator.share({
          files: [file],
          title: `Media generated by ${provider}`,
        });
      } else {
        throw new Error("Share API not available");
      }
    } catch (error) {
      // Fall back to download for any error (including share cancellation)
      console.error("Error sharing/downloading:", error);
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${fileName}${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    }
  },

  formatModelId: (modelId: string): string => {
    return modelId.split("/").pop() || modelId;
  },
};

// For backward compatibility - use the imageHelpers object that uses mediaHelpers internally
export const imageHelpers = {
  base64ToBlob: (base64Data: string, type = "image/png"): Blob => {
    return mediaHelpers.base64ToBlob(base64Data, MediaType.IMAGE);
  },

  generateImageFileName: (provider: string): string => {
    return mediaHelpers.generateMediaFileName(provider, MediaType.IMAGE);
  },

  shareOrDownload: async (imageData: string, provider: string): Promise<void> => {
    return mediaHelpers.shareOrDownload(imageData, provider, MediaType.IMAGE);
  },

  formatModelId: (modelId: string): string => {
    return mediaHelpers.formatModelId(modelId);
  },
};

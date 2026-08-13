"use client";

import React from "react";
import { useFormProcessing } from "@payloadcms/ui";

// Video uploads run a synchronous server-side pipeline after the file
// arrives (ffmpeg frame extraction + a second Cloudinary upload for the
// thumbnail) before the save request resolves, so a large file can leave the
// admin panel looking stuck for a while with no explanation. useFormProcessing
// reflects the actual in-flight save request, so this only shows while that's
// genuinely happening.
export function VideoUploadNotice() {
  const processing = useFormProcessing();

  if (!processing) return null;

  return (
    <div
      style={{
        padding: "12px 16px",
        marginBottom: "16px",
        background: "#fff8e1",
        border: "1px solid #f0c674",
        borderRadius: "4px",
        fontSize: "14px",
      }}
    >
      Uploading and processing your video — this can take a few minutes for
      large files. Please don&apos;t close this tab or navigate away.
    </div>
  );
}

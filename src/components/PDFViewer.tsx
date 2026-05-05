"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// 1. Declare the global Window interface to tell TypeScript about the external Adobe script
declare global {
  interface Window {
    AdobeDC?: {
      View: new (options: { clientId: string; divId: string }) => {
        previewFile(
          filePromise: {
            content: { location: { url: string } };
            metaData: { fileName: string };
          },
          viewerOptions: {
            embedMode:
              | "SIZED_CONTAINER"
              | "FULL_WINDOW"
              | "IN_LINE"
              | "LIGHTBOX";
            showDownloadPDF: boolean;
            showPrintPDF: boolean;
            showFullScreen: boolean;
          },
        ): void;
      };
    };
  }
}

interface PDFViewerProps {
  pdfUrl: string;
  fileName: string;
}

export default function PDFViewer({ pdfUrl, fileName }: PDFViewerProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_ADOBE_CLIENT_ID;

  useEffect(() => {
    // 2. We no longer need @ts-expect-error because TypeScript now knows what window.AdobeDC is!
    if (
      isScriptLoaded &&
      clientId &&
      typeof window !== "undefined" &&
      window.AdobeDC
    ) {
      const adobeDCView = new window.AdobeDC.View({
        clientId: clientId,
        divId: "adobe-pdf-viewer",
      });

      adobeDCView.previewFile(
        {
          content: { location: { url: pdfUrl } },
          metaData: { fileName: fileName },
        },
        {
          embedMode: "SIZED_CONTAINER",
          showDownloadPDF: false,
          showPrintPDF: false,
          showFullScreen: true,
        },
      );
    }
  }, [isScriptLoaded, pdfUrl, fileName, clientId]);

  if (!clientId) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        Missing Adobe Client ID in environment variables.
      </div>
    );
  }

  return (
    <div className="border-border relative h-[75vh] min-h-[600px] w-full overflow-hidden rounded-xl border bg-slate-50 shadow-sm">
      <Script
        src="https://acrobatservices.adobe.com/view-sdk/viewer.js"
        onReady={() => setIsScriptLoaded(true)}
      />

      <div id="adobe-pdf-viewer" className="absolute inset-0 h-full w-full" />
    </div>
  );
}

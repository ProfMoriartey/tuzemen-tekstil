"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

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
  const [error, setError] = useState<string | null>(null);
  const clientId = process.env.NEXT_PUBLIC_ADOBE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) return;

    const renderPDF = () => {
      try {
        if (!window.AdobeDC) return;

        const adobeDCView = new window.AdobeDC.View({
          clientId: clientId,
          divId: "adobe-pdf-viewer",
        });

        // 1. Detect if the user is on a mobile phone (less than 768px wide)
        const isMobile = window.innerWidth < 768;

        adobeDCView.previewFile(
          {
            content: { location: { url: pdfUrl } },
            metaData: { fileName: fileName },
          },
          {
            // 2. Automatically switch modes based on device
            embedMode: isMobile ? "IN_LINE" : "SIZED_CONTAINER",
            showDownloadPDF: false,
            showPrintPDF: false,
            // 3. Hide the fullscreen button on mobile since it's already inline
            showFullScreen: !isMobile,
          },
        );
      } catch (err: unknown) {
        console.error("Failed to render PDF:", err);
        if (err instanceof Error) {
          setError(err.message ?? "Failed to load the PDF viewer.");
        } else {
          setError("An unknown error occurred while loading the PDF.");
        }
      }
    };

    if (window.AdobeDC) {
      renderPDF();
    } else {
      document.addEventListener("adobe_dc_view_sdk.ready", renderPDF);
    }

    return () => {
      document.removeEventListener("adobe_dc_view_sdk.ready", renderPDF);
    };
  }, [pdfUrl, fileName, clientId]);

  if (!clientId) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        Missing Adobe Client ID in environment variables.
      </div>
    );
  }

  return (
    // 4. IMPORTANT CSS CHANGE: Removed fixed heights on mobile so the inline PDF can expand!
    // Added md:h-[75vh] and md:min-h-[600px] so it stays a neat box on desktop/tablet.
    <div className="border-border relative w-full rounded-xl border bg-slate-50 text-slate-900 shadow-sm md:h-[75vh] md:min-h-[600px]">
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
          <div className="rounded-lg bg-red-50 p-4 text-red-600">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      <Script src="https://acrobatservices.adobe.com/view-sdk/viewer.js" />

      <div id="adobe-pdf-viewer" className="h-full w-full" />
    </div>
  );
}

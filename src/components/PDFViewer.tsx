"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

// 1. Explicitly defining the shape of AdobeDC to eliminate the 'any' errors
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
        console.log("Adobe SDK is ready, attempting to render...");

        // TypeScript now knows exactly what window.AdobeDC is!
        if (!window.AdobeDC) return;

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
      } catch (err: unknown) {
        // 2. Switched from 'any' to 'unknown', and safely checking the error
        console.error("Failed to render PDF:", err);
        if (err instanceof Error) {
          // 3. Using ?? instead of || to satisfy the linter
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
    <div className="border-border relative h-[75vh] min-h-[600px] w-full overflow-hidden rounded-xl border bg-slate-50 text-slate-900 shadow-sm">
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
          <div className="rounded-lg bg-red-50 p-4 text-red-600">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* 4. Removed the 'beforeInteractive' strategy to fix the Next.js warning */}
      <Script src="https://acrobatservices.adobe.com/view-sdk/viewer.js" />

      <div id="adobe-pdf-viewer" className="absolute inset-0 h-full w-full" />
    </div>
  );
}

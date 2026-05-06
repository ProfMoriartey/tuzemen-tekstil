"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    AdobeDC?: any;
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

    // The function that actually draws the PDF
    const renderPDF = () => {
      try {
        console.log("Adobe SDK is ready, attempting to render...");

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
      } catch (err: any) {
        console.error("Failed to render PDF:", err);
        setError(err.message || "Failed to load the PDF viewer.");
      }
    };

    // Check if Adobe is already loaded (sometimes happens on fast hot-reloads)
    if (window.AdobeDC) {
      renderPDF();
    } else {
      // If not, wait for Adobe's official ready event
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
      {/* If an error occurs, it will show up here instead of a blank screen */}
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
          <div className="rounded-lg bg-red-50 p-4 text-red-600">
            <strong>Error:</strong> {error}
          </div>
        </div>
      )}

      {/* Force Next.js to load the script before the page becomes fully interactive */}
      <Script
        src="https://acrobatservices.adobe.com/view-sdk/viewer.js"
        strategy="beforeInteractive"
      />

      {/* The container Adobe needs to inject into */}
      <div id="adobe-pdf-viewer" className="absolute inset-0 h-full w-full" />
    </div>
  );
}

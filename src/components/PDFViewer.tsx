"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface PDFViewerProps {
  pdfUrl: string;
  fileName: string;
}

export default function PDFViewer({ pdfUrl, fileName }: PDFViewerProps) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_ADOBE_CLIENT_ID;

  useEffect(() => {
    // Only attempt to load the PDF if the Adobe script is ready and we have an ID
    if (isScriptLoaded && clientId && typeof window !== "undefined") {
      // @ts-expect-error - AdobeDC is injected globally by the script
      if (window.AdobeDC) {
        // @ts-expect-error
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
            // SIZED_CONTAINER forces the PDF to fit exactly inside our Tailwind div
            embedMode: "SIZED_CONTAINER",
            showDownloadPDF: false, // Prevents downloading the massive file
            showPrintPDF: false,
            showFullScreen: true,
          },
        );
      }
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
      {/* 
        The Next.js Script component automatically handles asynchronous loading.
        Once loaded, it sets our state to true, triggering the useEffect above.
      */}
      <Script
        src="https://acrobatservices.adobe.com/view-sdk/viewer.js"
        onReady={() => setIsScriptLoaded(true)}
      />

      {/* The Adobe API will inject the PDF canvas directly into this div */}
      <div id="adobe-pdf-viewer" className="absolute inset-0 h-full w-full" />
    </div>
  );
}

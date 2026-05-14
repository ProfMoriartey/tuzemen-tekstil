import { getTranslations } from "next-intl/server";
import PDFViewer from "~/components/PDFViewer";

export const metadata = {
  title: "Fabric Catalog | Tüzemen Textile",
  description: "Browse our complete, high-resolution fabric catalog.",
};

export default async function CatalogPage() {
  // Optional: Add translation strings for this header if you want
  // const t = await getTranslations("CatalogPage");

  // Replace this with your actual uploaded PDF URL from Uploadthing
  const uploadThingPdfUrl =
    "https://0m7zywkdga.ufs.sh/f/NvuvlEaQRsPhXV4zlRP9p7rFD1Z8TW5zCuI34KitASsYx9Nl";

  return (
    <div className="bg-theme-bg min-h-screen py-8 md:py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-theme-primary text-3xl font-bold tracking-wide uppercase">
            Digital Catalog
          </h1>
          <p className="text-theme-text/70 mt-2">
            Browse our latest collections. Use the controls at the bottom to
            zoom or enter full screen.
          </p>
        </div>

        {/* The PDF Viewer */}
        <PDFViewer
          pdfUrl={uploadThingPdfUrl}
          fileName="Tuzemen-Textile-Catalog-2026.pdf"
        />
      </div>
    </div>
  );
}

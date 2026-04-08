import { Link } from "~/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdjacentDesign {
  id: number;
  name: string;
}

interface ProductNavigationProps {
  previous: AdjacentDesign | null;
  next: AdjacentDesign | null;
}

export default function ProductNavigation({
  previous,
  next,
}: ProductNavigationProps) {
  return (
    <nav className="flex items-center gap-3 sm:gap-4">
      {previous && (
        <Link
          href={`/products/${previous.id}`}
          className="text-theme-text/70 hover:text-theme-text group flex items-center gap-2 text-sm transition-colors"
          title={previous.name}
        >
          <div className="bg-theme-bg border-theme-primary/30 group-hover:border-theme-primary/60 group-hover:bg-theme-secondary/10 flex h-8 w-auto items-center justify-center rounded-full border p-2 transition-all">
            <ChevronLeft className="h-4 w-4 pr-0.5" />
            <span className="max-w-30 truncate font-medium md:inline lg:max-w-50">
              {previous.name}
            </span>
          </div>
          {/* Hidden on small screens to prevent layout breaking */}
        </Link>
      )}

      {/* Only show the vertical divider if BOTH previous and next exist */}
      {previous && next && <div className="bg-theme-primary/30 h-4 w-px" />}

      {next && (
        <Link
          href={`/products/${next.id}`}
          className="text-theme-text/70 hover:text-theme-text group flex items-center gap-2 text-sm transition-colors"
          title={next.name}
        >
          <div className="bg-theme-bg border-theme-primary/30 group-hover:border-theme-primary/60 group-hover:bg-theme-secondary/10 flex h-8 w-auto items-center justify-center rounded-full border p-2 transition-all">
            <span className="max-w-30 truncate text-right font-medium md:inline lg:max-w-50">
              {next.name}
            </span>
            <ChevronRight className="h-4 w-4 pl-0.5" />
          </div>
        </Link>
      )}
    </nav>
  );
}

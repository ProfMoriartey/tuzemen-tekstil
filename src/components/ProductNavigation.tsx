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
          className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
          title={previous.name}
        >
          <div className="flex h-8 w-auto items-center justify-center rounded-full border border-slate-200 bg-white p-2 transition-all group-hover:border-slate-300 group-hover:bg-slate-50">
            <ChevronLeft className="h-4 w-4 pr-0.5" />
            <span className="max-w-30 truncate font-medium md:inline lg:max-w-50">
              {previous.name}
            </span>
          </div>
          {/* Hidden on small screens to prevent layout breaking */}
        </Link>
      )}

      {/* Only show the vertical divider if BOTH previous and next exist */}
      {previous && next && <div className="h-4 w-px bg-slate-200" />}

      {next && (
        <Link
          href={`/products/${next.id}`}
          className="group flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900"
          title={next.name}
        >
          <div className="flex h-8 w-auto items-center justify-center rounded-full border border-slate-200 bg-white p-2 transition-all group-hover:border-slate-300 group-hover:bg-slate-50">
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

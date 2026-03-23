import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="bg-theme-bg flex min-h-[60vh] flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <Loader2 className="text-theme-accent h-10 w-10 animate-spin" />
        <p className="text-theme-text/70 text-sm font-bold tracking-widest uppercase">
          Loading Tuzemen Group
        </p>
      </div>
    </div>
  );
}

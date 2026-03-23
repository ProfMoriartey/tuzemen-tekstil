"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "~/components/ui/input";

export default function SearchRequests() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }

    // Updates the URL without reloading the page
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex w-full flex-1 sm:max-w-md">
      <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <Input
        type="text"
        placeholder="Search by name or company..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q")?.toString()}
        className="border-slate-200 bg-white pl-10"
      />
    </div>
  );
}

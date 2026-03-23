"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "~/i18n/routing";
import { type ChangeEvent, useTransition } from "react";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className="relative flex items-center">
      <Globe className="pointer-events-none absolute left-2 h-4 w-4 text-slate-500" />
      <select
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
        className="hover:text-theme-accent cursor-pointer appearance-none bg-transparent py-2 pr-4 pl-8 text-sm font-bold text-slate-700 uppercase focus:outline-none disabled:opacity-50"
      >
        <option value="en">EN</option>
        <option value="tr">TR</option>
      </select>
    </div>
  );
}

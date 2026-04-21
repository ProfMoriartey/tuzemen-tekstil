import Image from "next/image";
import { Link } from "~/i18n/routing";
import { getTranslations } from "next-intl/server";
import { 
  Globe, 
  ShoppingBag, 
  Info, 
  Mail, 
  MessageCircle 
} from "lucide-react";

// You can swap this for Next.js Metadata to ensure the page looks good when shared via iMessage/WhatsApp
export const metadata = {
  title: "Connect with Us | Tüzemen Textile",
  description: "Quick links to our catalog, website, and contact information.",
};

export default async function LinksPage() {
  const t = await getTranslations("LinksPage");

  // Define your links here. 
  // For external links like WhatsApp, replace the href and use a standard <a> tag instead of the Next.js <Link>
  const links = [
    { 
      icon: Globe, 
      href: "/", 
      label: t("links.home"),
      isExternal: false
    },
    { 
      icon: ShoppingBag, 
      href: "/products", 
      label: t("links.catalog"),
      isExternal: false
    },
    { 
      icon: Info, 
      href: "/about", 
      label: t("links.about"),
      isExternal: false
    },
    { 
      icon: Mail, 
      href: "/contact", 
      label: t("links.contact"),
      isExternal: false
    },
    { 
      icon: MessageCircle, 
      href: "https://wa.me/your_number_here", // Replace with actual WhatsApp link
      label: t("links.whatsapp"),
      isExternal: true
    },
  ];

  return (
    <div className="min-h-screen bg-theme-bg flex flex-col items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-sm space-y-10">
        
        {/* Profile / Header Section */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-theme-bg shadow-xl ring-2 ring-theme-primary/10">
            {/* Replace with your actual logo or headshot path */}
            <Image 
              src="/placeholder.jpg" 
              alt="Profile" 
              fill 
              className="object-cover"
              priority
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-wide text-theme-primary uppercase">
              Tüzemen Textile
            </h1>
            <p className="mt-1 text-sm font-medium text-theme-text/60 uppercase tracking-widest">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="flex flex-col gap-4 w-full">
          {links.map((link, index) => {
            const Icon = link.icon;
            const className = "group relative flex items-center justify-between w-full p-4 rounded-xl border border-border bg-theme-bg shadow-sm transition-all hover:border-theme-primary hover:shadow-md active:scale-[0.98]";
            
            const innerContent = (
              <>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-theme-secondary text-theme-primary transition-colors group-hover:bg-theme-primary group-hover:text-theme-bg">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="font-semibold text-theme-text group-hover:text-theme-primary transition-colors">
                    {link.label}
                  </span>
                </div>
                {/* Subtle right arrow indicator */}
                <svg className="h-5 w-5 text-theme-text/30 group-hover:text-theme-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </>
            );

            if (link.isExternal) {
              return (
                <a 
                  key={index} 
                  href={link.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={className}
                >
                  {innerContent}
                </a>
              );
            }

            return (
              <Link 
                key={index} 
                href={link.href} 
                className={className}
              >
                {innerContent}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-8 text-center">
          <p className="text-xs font-medium text-theme-text/40">
            {t("footer")}
          </p>
        </div>

      </div>
    </div>
  );
}
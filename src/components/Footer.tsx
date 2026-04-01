import { Link } from "~/i18n/routing";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("Footer");

  const quickLinks = [
    { name: t("links.home"), path: "/" },
    { name: t("links.products"), path: "/products" },
    { name: t("links.about"), path: "/about" },
    { name: t("links.contact"), path: "/contact" },
  ];

  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900 py-12 text-slate-300 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <h3 className="mb-6 text-xl font-bold tracking-widest text-white uppercase">
              {t("company.name")}
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              {t("company.description")}
            </p>
            <div className="mt-8 flex items-center gap-5">
              <a
                href="https://instagram.com/tuzemengroup"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-theme-accent text-slate-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>

              <a
                href="https://facebook.com/tuzemengroup"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-theme-accent text-slate-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>

              <a
                href="https://linkedin.com/company/tuzemengroup"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-theme-accent text-slate-400 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
              {t("links.title")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="group flex items-center text-sm transition-colors hover:text-white"
                  >
                    <ChevronRight className="mr-2 h-4 w-4 text-slate-600 transition-colors group-hover:text-white" />
                    {link.name}
                  </Link>
                </li>
              ))}

              <li className="mt-4 border-t border-slate-800 pt-4">
                <Link
                  href="/tuzemen"
                  className="group flex items-center text-sm text-slate-500 transition-colors hover:text-white"
                >
                  <ChevronRight className="mr-2 h-4 w-4 text-slate-700 transition-colors group-hover:text-white" />
                  {t("links.admin")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
              {t("contact.title")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mt-0.5 mr-3 h-5 w-5 shrink-0 text-slate-500" />
                <span className="text-sm leading-relaxed text-slate-400">
                  SAMANLI MAHALLESİ SEL SOK B BLOK NO:67/F
                  <br />
                  16350 YILDIRIM BURSA/TURKEY
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 shrink-0 text-slate-500" />
                <span className="text-sm text-slate-400">+90 224 3460632</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 shrink-0 text-slate-500" />
                <span className="text-sm text-slate-400">
                  info@tuzemengroup.com
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Embedded Map */}
          <div className="relative h-48 min-h-50 overflow-hidden rounded-lg bg-slate-800 md:h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3045.7522123081053!2d29.114439476047426!3d40.2368112714691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca4024c47b7f8f%3A0x5c9fb57a97de00a4!2sT%C3%BCzemen%20Tekstil%20Makina%20G%C4%B1da%20Turizm%20Sa%C4%9Fl%C4%B1k%20Otomotiv%20%C4%B0n%C5%9Faat%20San.%20Tic.%20Ltd.%20%C5%9Eti.!5e0!3m2!1sen!2str!4v1773228921380!5m2!1sen!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 opacity-80 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              title={t("contact.mapTitle")}
            ></iframe>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-500 md:flex-row">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
}

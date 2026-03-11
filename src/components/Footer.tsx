import Link from "next/link";
import { MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800 bg-slate-900 py-12 text-slate-300 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Column 1: Company Info */}
          <div className="space-y-4">
            <h3 className="mb-6 text-xl font-bold tracking-widest text-white uppercase">
              Tuzemen Group
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Premium fabrics for every space. We specialize in high-quality
              sheers, drapery, and accent textiles crafted to exact
              specifications.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About Us", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="group flex items-center text-sm transition-colors hover:text-white"
                  >
                    <ChevronRight className="mr-2 h-4 w-4 text-slate-600 transition-colors group-hover:text-white" />
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Admin Link Separator */}
              <li className="mt-4 border-t border-slate-800 pt-4">
                <Link
                  href="/admin"
                  className="group flex items-center text-sm text-slate-500 transition-colors hover:text-white"
                >
                  <ChevronRight className="mr-2 h-4 w-4 text-slate-700 transition-colors group-hover:text-white" />
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="mb-6 text-sm font-bold tracking-wider text-white uppercase">
              Contact Us
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
            {/* Replace this src with your actual Google Maps embed link */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d640.2938940108288!2d29.118274737026056!3d40.23646383420761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2str!4v1773228583148!5m2!1sen!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 opacity-80 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
              title="Tuzemen Group Location"
            ></iframe>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-500 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Tuzemen Group. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

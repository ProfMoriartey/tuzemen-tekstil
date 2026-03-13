import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ContactForm from "./ContactForm";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-theme-bg flex min-h-screen flex-col">
      {/* Header Section */}
      <section className="relative flex min-h-87.5 items-center overflow-hidden px-4 py-20 md:py-32">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.tuzemengroup.com/uploads/KLT_9147_1_1_61e43d6762.jpg?w=3840&q=75" // Replace with your contact header image
            alt="Contact Tuzemen Group"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay to ensure text readability */}
          <div className="bg-theme-secondary/85 absolute inset-0"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white uppercase md:text-5xl">
            Get in Touch
          </h1>
          <p className="text-theme-primary mx-auto max-w-2xl text-lg leading-relaxed">
            Whether you are requesting fabric samples, inquiring about bulk
            orders, or looking to partner with us, our team is ready to assist
            you.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
            {/* Left Column: Contact Form */}
            <div className="border-theme-primary/20 rounded-2xl border bg-white p-8 shadow-sm md:p-10">
              <h2 className="text-theme-text mb-8 text-2xl font-bold tracking-tight uppercase">
                Send a Message
              </h2>
              <ContactForm />
            </div>

            {/* Right Column: Contact Information */}
            <div className="flex flex-col justify-center space-y-10">
              <div>
                <h2 className="text-theme-text mb-8 text-2xl font-bold tracking-tight uppercase">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-theme-secondary/5 mr-4 shrink-0 rounded-full p-3">
                      <MapPin className="text-theme-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-theme-text mb-1 text-sm font-bold tracking-wider uppercase">
                        Headquarters & Factory
                      </h3>
                      <p className="text-theme-text/90 leading-relaxed">
                        SAMANLI MAHALLESİ SEL SOK B BLOK NO:67/F
                        <br />
                        16350 YILDIRIM BURSA/TURKEY
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-theme-secondary/5 mr-4 shrink-0 rounded-full p-3">
                      <Phone className="text-theme-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-theme-text mb-1 text-sm font-bold tracking-wider uppercase">
                        Phone
                      </h3>
                      <p className="text-theme-text/70">
                        +90 224 3460632
                        <br />
                        <span className="text-theme-text/50 text-sm">
                          Mon-Fri, 8am - 6pm (TRT)
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-theme-secondary/5 mr-4 shrink-0 rounded-full p-3">
                      <Mail className="text-theme-accent h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-theme-text mb-1 text-sm font-bold tracking-wider uppercase">
                        Email
                      </h3>
                      <p className="text-theme-text/70">
                        info@tuzementekstil.com
                        <br />
                        sales1@tuzementekstil.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-theme-primary/30 border-t pt-8">
                <div className="flex items-start">
                  <div className="bg-theme-secondary/5 mr-4 shrink-0 rounded-full p-3">
                    <Clock className="text-theme-accent h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-theme-text mb-1 text-sm font-bold tracking-wider uppercase">
                      Business Hours
                    </h3>
                    <ul className="text-theme-text/70 space-y-1">
                      <li className="flex w-48 justify-between">
                        <span>Monday - Friday:</span>
                        <span>08:00 - 18:00</span>
                      </li>
                      <li className="text-theme-text/50 flex w-48 justify-between">
                        <span>Sunday-Saturday:</span>
                        <span>Closed</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Map Section */}
      <section className="relative h-100 w-full bg-slate-200 md:h-125">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3045.7522123081053!2d29.114439476047426!3d40.2368112714691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca4024c47b7f8f%3A0x5c9fb57a97de00a4!2sT%C3%BCzemen%20Tekstil%20Makina%20G%C4%B1da%20Turizm%20Sa%C4%9Fl%C4%B1k%20Otomotiv%20%C4%B0n%C5%9Faat%20San.%20Tic.%20Ltd.%20%C5%9Eti.!5e0!3m2!1sen!2str!4v1773228921380!5m2!1sen!2str"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 opacity-90 grayscale transition-all duration-700 hover:opacity-100 hover:grayscale-0"
          title="Tuzemen Group Location"
        ></iframe>
      </section>
    </div>
  );
}

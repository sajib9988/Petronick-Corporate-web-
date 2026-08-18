import ContactForm from "@/components/admin/form/contact-form";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getPageBySlug } from "@/service/cms";
import { Container } from "@/components/Container";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const pageRes = await getPageBySlug("contact-page");

  const sections = pageRes?.data?.sections ?? [];

  const contactSection = sections.find(
    (section: any) => section.sectionType === "CONTACT"
  );

  const content = contactSection?.content ?? {};

  // ==========================================
  // DYNAMIC CONTENT
  // ==========================================

  const heroImage =
    contactSection?.image ?? "/contact-hero.jpg";

  const badge =
    content.badge ?? "GET IN TOUCH";

  const heroTitle =
    content.title ?? "Contact Us";

  const heroSubtitle =
    content.subtitle ??
    "Have a question or want to explore partnership opportunities? We'd love to hear from you.";

  const email =
    content.email ?? "info@petronick.com";

  const website =
    content.website ?? "petronickholdings.com";

  const phone =
    content.phone ?? "+1 (555) 000-0000";

  const location =
    content.location ?? "Pittsburgh, PA, USA";

  const aboutTitle =
    content.aboutTitle ?? "About Petronick";

  const aboutDescription =
    content.aboutDescription ??
    "A vertically integrated holding company operating marketing, product development, fulfillment, advisory, and e-commerce brands across multiple revenue-generating subsidiaries.";

  // ==========================================
  // CONTACT INFO
  // ==========================================

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: email,
      iconClass: "text-emerald-600",
      bgClass: "bg-emerald-50",
    },
    {
      icon: Globe,
      label: "Website",
      value: website,
      iconClass: "text-blue-600",
      bgClass: "bg-blue-50",
    },
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      iconClass: "text-violet-600",
      bgClass: "bg-violet-50",
    },
    {
      icon: MapPin,
      label: "Location",
      value: location,
      iconClass: "text-orange-600",
      bgClass: "bg-orange-50",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F7F9FC]">

      {/* ==================================================
          HERO
      ================================================== */}

      <Container className="pt-8 sm:pt-10">

        <section className="relative h-[280px] overflow-hidden rounded-3xl sm:h-[360px] lg:h-[420px]">

          <Image
            src={heroImage}
            alt={heroTitle}
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-[#0B1220]/65" />

          {/* Content */}

          <div className="relative flex h-full flex-col items-center justify-center px-5 text-center">

            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400">
              {badge}
            </p>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {heroTitle}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              {heroSubtitle}
            </p>

          </div>

        </section>

      </Container>


      {/* ==================================================
          CONTACT CONTENT
      ================================================== */}

      <Container>

        <section className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-3">

          {/* ==============================================
              LEFT SIDE
          ============================================== */}

          <div className="space-y-4">

            {contactInfo.map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    p-5
                    shadow-[0_2px_8px_rgba(15,23,42,0.03)]
                    transition-shadow
                    hover:shadow-md
                  "
                >

                  {/* Icon */}

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      ${item.bgClass}
                    `}
                  >
                    <Icon
                      size={18}
                      className={item.iconClass}
                    />
                  </div>


                  {/* Text */}

                  <div className="min-w-0">

                    <p className="text-xs font-medium text-slate-400">
                      {item.label}
                    </p>

                    <p className="mt-1 break-words text-sm font-semibold text-[#111827]">
                      {item.value}
                    </p>

                  </div>

                </div>
              );
            })}


            {/* ==========================================
                ABOUT PETRONICK
            ========================================== */}

            <div className="rounded-2xl bg-[#0B1220] p-6">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
                {aboutTitle}
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {aboutDescription}
              </p>

            </div>

          </div>


          {/* ==============================================
              CONTACT FORM
          ============================================== */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_2px_8px_rgba(15,23,42,0.03)] sm:p-8 lg:col-span-2">

            <div className="mb-7">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
                Send a Message
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#111827]">
                Let&apos;s Talk
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

            </div>

            <ContactForm />

          </div>

        </section>

      </Container>

    </main>
  );
}
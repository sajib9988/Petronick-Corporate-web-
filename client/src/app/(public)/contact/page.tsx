import ContactForm from "@/components/admin/form/contact-form";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { getPageBySlug } from "@/service/cms";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const pageRes = await getPageBySlug("contact-page");
  const sections = pageRes?.data?.sections ?? [];
  const contactSection = sections.find((s: any) => s.sectionType === "CONTACT");

  const heroImage = contactSection?.image || "/contact-hero.jpg";
  const content = contactSection?.content ?? {};

  const heroTitle = content.title ?? "Contact Us";
  const heroSubtitle =
    content.subtitle ??
    "Have a question or want to explore partnership opportunities? We'd love to hear from you.";
  const email = content.email ?? "info@petronick.com";
  const phone = content.phone ?? "+1 (555) 000-0000";
  const location = content.location ?? "Pittsburgh, PA, USA";

  return (
    <main className="min-h-screen">
      {/* Image Banner */}
      <section className="pt-8 sm:pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden h-[280px] sm:h-[360px] lg:h-[420px]">
            <Image
              src={heroImage}
              alt="Contact Petronick Corporate Holdings"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gray-950/60" />

            <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
              <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
                Get In Touch
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">{heroTitle}</h1>
              <p className="text-gray-200 max-w-xl mx-auto text-sm leading-relaxed">
                {heroSubtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-5">
          {[
            { icon: <Mail size={18} className="text-emerald-600" />, label: "Email", value: email, bg: "bg-emerald-50" },
            { icon: <Globe size={18} className="text-orange-600" />, label: "Website", value: "petronickholdings.com", bg: "bg-orange-50" },
            { icon: <Phone size={18} className="text-blue-600" />, label: "Phone", value: phone, bg: "bg-blue-50" },
            { icon: <MapPin size={18} className="text-purple-600" />, label: "Location", value: location, bg: "bg-purple-50" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow"
            >
              <div className={`p-2.5 rounded-xl ${item.bg} flex-shrink-0`}>{item.icon}</div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}

          <div className="bg-gray-900 text-white rounded-xl p-5 mt-2">
            <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-2">
              About Petronick
            </p>
            <p className="text-xs text-gray-300 leading-relaxed">
              A vertically integrated holding company operating marketing,
              product development, fulfillment, advisory, and e-commerce brands
              across multiple revenue-generating subsidiaries.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Send a Message</h2>
          <p className="text-sm text-gray-400 mb-6">
            Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
import ContactForm from "@/components/admin/form/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            Get In Touch
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            Have a question or want to explore partnership opportunities?
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info Cards */}
        <div className="space-y-5">
          {[
            {
              icon: <Mail size={18} className="text-emerald-600" />,
              label: "Email",
              value: "info@petronick.com",
              bg: "bg-emerald-50",
            },
            {
              icon: <Phone size={18} className="text-blue-600" />,
              label: "Phone",
              value: "+1 (555) 000-0000",
              bg: "bg-blue-50",
            },
            {
              icon: <MapPin size={18} className="text-purple-600" />,
              label: "Location",
              value: "Pittsburgh, PA, USA",
              bg: "bg-purple-50",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow"
            >
              <div className={`p-2.5 rounded-xl ${item.bg} flex-shrink-0`}>
                {item.icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-0.5">{item.label}</p>
                <p className="text-sm font-semibold text-gray-800">{item.value}</p>
              </div>
            </div>
          ))}

          {/* About blurb */}
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

        {/* Form */}
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
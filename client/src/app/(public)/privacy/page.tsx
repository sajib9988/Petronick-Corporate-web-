import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-400 text-sm">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="prose prose-gray max-w-none space-y-8 text-sm text-gray-600 leading-relaxed">

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Introduction</h2>
            <p>
              Petronick Corporate Holdings LLC ("Petronick," "we," "us," or "our") is committed
              to protecting your personal information and your right to privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when
              you visit our website and use our services.
            </p>
            <p className="mt-3">
              Please read this policy carefully. If you disagree with its terms, please discontinue
              use of our site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Information We Collect</h2>
            <p className="mb-3">We may collect the following types of information:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-gray-800">Personal Identification Information:</strong> Name,
                email address, phone number, and location when you submit a contact form or
                Promotion Agent application.
              </li>
              <li>
                <strong className="text-gray-800">Professional Information:</strong> Business
                experience, focus areas, and business unit interests provided in agent applications.
              </li>
              <li>
                <strong className="text-gray-800">Usage Data:</strong> Browser type, IP address,
                pages visited, and time spent on our website through standard analytics tools.
              </li>
              <li>
                <strong className="text-gray-800">Communications:</strong> Any messages or
                correspondence you send us through our contact forms.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Process and respond to Promotion Agent applications</li>
              <li>Respond to contact inquiries and provide customer support</li>
              <li>Send administrative communications about your application status</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
              <li>Protect the security and integrity of our platform</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. Sharing Your Information</h2>
            <p className="mb-3">
              We do not sell, trade, or rent your personal information to third parties. We may
              share your information in the following limited circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-gray-800">Service Providers:</strong> Trusted third-party
                vendors who assist in operating our website and conducting business (e.g., email
                services, CRM systems), subject to confidentiality agreements.
              </li>
              <li>
                <strong className="text-gray-800">Legal Requirements:</strong> When required by law
                or in response to valid legal processes.
              </li>
              <li>
                <strong className="text-gray-800">Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes
              outlined in this policy, unless a longer retention period is required or permitted
              by law. Promotion Agent application data is retained for the duration of the
              application review process and any subsequent business relationship.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect
              your information against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal information</li>
              <li>Withdraw consent where processing is based on consent</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:info@petronick.com"
                className="text-gray-900 font-medium underline"
              >
                info@petronick.com
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Cookies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your
              browsing experience. You can control cookie settings through your browser
              preferences. Disabling cookies may affect the functionality of certain parts of
              our website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, including our subsidiary
              company websites. We are not responsible for the privacy practices of those sites
              and encourage you to review their respective privacy policies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              material changes by updating the "Last updated" date at the top of this page.
              Continued use of our website after changes constitutes acceptance of the updated
              policy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">11. Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="mt-3 bg-gray-50 border border-gray-100 rounded-xl p-5 text-sm">
              <p className="font-semibold text-gray-900">Petronick Corporate Holdings LLC</p>
              <p className="mt-1 text-gray-600">Pittsburgh, PA, USA</p>
              <p className="mt-1">
                <a href="mailto:info@petronick.com" className="text-gray-900 underline">
                  info@petronick.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Back links */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap gap-4 text-sm">
          <Link href="/" className="text-gray-500 hover:text-gray-900 transition-colors">
            ← Back to Home
          </Link>
          <Link
            href="/terms"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            Terms of Use →
          </Link>
        </div>
      </section>
    </main>
  );
}

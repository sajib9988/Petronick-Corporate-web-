import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-3">
            Legal
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Terms of Use</h1>
          <p className="text-gray-400 text-sm">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-4 py-14">
        <div className="space-y-8 text-sm text-gray-600 leading-relaxed">

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Petronick Corporate Holdings LLC website
              (petronick.com), you accept and agree to be bound by these Terms of Use and our
              Privacy Policy. If you do not agree to these terms, please do not use our website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. Use of the Website</h2>
            <p className="mb-3">You agree to use this website only for lawful purposes. You must not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Use the site in any way that violates applicable local, national, or
                international laws or regulations
              </li>
              <li>
                Transmit any unsolicited or unauthorized advertising or promotional material
              </li>
              <li>
                Attempt to gain unauthorized access to any part of the website or its related
                systems
              </li>
              <li>
                Engage in any conduct that restricts or inhibits anyone's use or enjoyment of
                the website
              </li>
              <li>
                Use automated tools, bots, or scrapers to extract data from the website
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              3. Promotion Agent Applications
            </h2>
            <p className="mb-3">
              Submitting a Promotion Agent application through our website does not guarantee
              acceptance or create an employment or contractor relationship. By submitting an
              application, you:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Confirm that all information provided is accurate and complete to the best of
                your knowledge
              </li>
              <li>
                Agree that Petronick Corporate Holdings LLC may contact you regarding your
                application via the contact information provided
              </li>
              <li>
                Acknowledge that acceptance is at the sole discretion of Petronick Corporate
                Holdings LLC
              </li>
              <li>
                Understand that any formal agreement will be documented separately upon approval
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              4. Intellectual Property
            </h2>
            <p>
              All content on this website — including text, graphics, logos, images, and
              software — is the property of Petronick Corporate Holdings LLC or its content
              suppliers and is protected by applicable intellectual property laws. You may not
              reproduce, distribute, or create derivative works without express written
              permission.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. Disclaimer of Warranties</h2>
            <p>
              This website and its content are provided on an "as is" and "as available" basis
              without any warranties of any kind, either express or implied. Petronick Corporate
              Holdings LLC does not warrant that the website will be uninterrupted, error-free,
              or free of viruses or other harmful components.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by law, Petronick Corporate Holdings LLC shall not
              be liable for any indirect, incidental, special, consequential, or punitive damages
              arising out of or related to your use of, or inability to use, this website or its
              content.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites, including our subsidiary
              companies. These links are provided for convenience only. Petronick Corporate
              Holdings LLC does not endorse or assume responsibility for the content, privacy
              policies, or practices of any third-party websites.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. Governing Law</h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws
              of the Commonwealth of Pennsylvania, United States of America, without regard to
              its conflict of law provisions. Any disputes arising under these terms shall be
              subject to the exclusive jurisdiction of the courts located in Pennsylvania.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Use at any time. Changes will be
              effective immediately upon posting to the website. Your continued use of the
              website after any changes constitutes your acceptance of the new terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. Contact</h2>
            <p>
              Questions about these Terms of Use should be directed to:
            </p>
            <div className="mt-3 bg-gray-50 border border-gray-100 rounded-xl p-5">
              <p className="font-semibold text-gray-900">Petronick Corporate Holdings LLC</p>
              <p className="mt-1 text-gray-600">Pittsburgh, PA, USA</p>
              <p className="mt-1">
                <a
                  href="mailto:info@petronick.com"
                  className="text-gray-900 underline"
                >
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
            href="/privacy"
            className="text-gray-500 hover:text-gray-900 transition-colors"
          >
            Privacy Policy →
          </Link>
        </div>
      </section>
    </main>
  );
}

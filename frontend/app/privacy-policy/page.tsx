import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import Image from "next/image";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 md:py-14 lg:py-[73px]">
      <Navbar />

      {/* Hero */}
      <section className="page-padding pt-16 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-[480px]">
            <h1 className="text-4xl md:text-5xl font-mono text-white mb-6">
              Pesatone Privacy Policy
            </h1>
            <p className="text-[#8A8A8B] text-lg leading-relaxed">
              Connect, Engage, and Earn Securely – African influencers, your
              journey to success starts here
            </p>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/happy-face.png"
              alt="Privacy Policy"
              width={380}
              height={380}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="page-padding max-w-[860px] flex flex-col gap-10 pb-24">
        <PolicySection title="1. Introduction">
          <p>
            Pesatone (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your
            personal information and your right to privacy. This Privacy Policy
            describes how we collect, use, and share information about you when
            you use our Platform.
          </p>
          <p>
            By using Pesatone, you agree to the collection and use of
            information in accordance with this policy. If you have questions or
            concerns, please contact us at{" "}
            <a
              href="mailto:support@pesatone.com"
              className="underline text-white hover:text-[#8A8A8B] transition-colors"
            >
              support@pesatone.com
            </a>
            .
          </p>
        </PolicySection>

        <PolicySection title="2. Information We Collect">
          <p>
            We collect information you provide directly to us when you create an
            account, make or receive payments, or communicate with us. This
            includes your name, email address, phone number, profile photo,
            payment information, and any other information you choose to
            provide.
          </p>
          <p>
            We also automatically collect certain information about your device
            and how you interact with the Platform, including IP address,
            browser type, operating system, referring URLs, and pages visited.
          </p>
        </PolicySection>

        <PolicySection title="3. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>Provide, operate, and maintain the Platform</li>
            <li>Process transactions and send related information</li>
            <li>Send promotional communications (with your consent)</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze usage patterns and trends</li>
            <li>
              Detect, investigate, and prevent fraudulent or illegal activity
            </li>
            <li>Comply with legal obligations</li>
          </ul>
        </PolicySection>

        <PolicySection title="4. Sharing of Information">
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with:
          </p>
          <ul className="list-disc pl-6 flex flex-col gap-2">
            <li>
              <strong className="text-white">Service providers</strong> who
              assist us in operating the Platform (e.g., payment processors,
              cloud hosting providers)
            </li>
            <li>
              <strong className="text-white">Other users</strong> as necessary
              to facilitate transactions (e.g., your display name and profile
              photo visible to the creator you support)
            </li>
            <li>
              <strong className="text-white">Law enforcement</strong> when
              required by law or to protect the safety of our users
            </li>
          </ul>
        </PolicySection>

        <PolicySection title="5. Data Security">
          <p>
            We take the security of your data seriously. We use
            industry-standard encryption and security measures to protect your
            personal information from unauthorized access, disclosure,
            alteration, or destruction.
          </p>
          <p>
            If you find out that someone has used your account without your
            permission, you should report it to{" "}
            <a
              href="mailto:support@pesatone.com"
              className="underline text-white hover:text-[#8A8A8B] transition-colors"
            >
              support@pesatone.com
            </a>{" "}
            immediately.
          </p>
        </PolicySection>

        <PolicySection title="6. Data Retention">
          <p>
            We retain your personal information for as long as your account is
            active or as needed to provide you services. You may request
            deletion of your account and associated data at any time by
            contacting us. Note that some information may be retained for legal
            or legitimate business purposes.
          </p>
        </PolicySection>

        <PolicySection title="7. Your Rights">
          <p>
            Depending on your location, you may have the right to access,
            correct, or delete your personal data, object to or restrict
            processing, and request data portability. To exercise these rights,
            please contact us at{" "}
            <a
              href="mailto:support@pesatone.com"
              className="underline text-white hover:text-[#8A8A8B] transition-colors"
            >
              support@pesatone.com
            </a>
            .
          </p>
        </PolicySection>

        <PolicySection title="8. Cookies">
          <p>
            We use cookies and similar tracking technologies to track activity
            on our Platform and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent. However, if you do not accept cookies, some parts of the
            Platform may not function properly.
          </p>
        </PolicySection>

        <PolicySection title="9. Children's Privacy">
          <p>
            The Platform is not directed to individuals under the age of 18. We
            do not knowingly collect personal information from children. If we
            become aware that a child has provided us with personal information,
            we will take steps to delete such information.
          </p>
        </PolicySection>

        <PolicySection title="10. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any significant changes by posting the new policy on this
            page and updating the effective date. Your continued use of the
            Platform after such changes constitutes your acceptance of the
            updated policy.
          </p>
        </PolicySection>

        <PolicySection title="11. Contact Us">
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
            <a
              href="mailto:support@pesatone.com"
              className="underline text-white hover:text-[#8A8A8B] transition-colors"
            >
              support@pesatone.com
            </a>
            .
          </p>
        </PolicySection>
      </section>

      <Footer />
    </div>
  );
}

function PolicySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white font-bold text-lg">{title}</h2>
      <div className="flex flex-col gap-3 text-[#C0C0C2] leading-relaxed text-base">
        {children}
      </div>
    </div>
  );
}

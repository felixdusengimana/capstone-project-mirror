import Footer from "@/components/organisms/Footer";
import Navbar from "@/components/organisms/Navbar";
import Image from "next/image";

export default function TermsOfUsePage() {
  return (
    <div className="py-12 md:py-14 lg:py-[73px]">
      <Navbar />

      {/* Hero */}
      <section className="page-padding pt-16 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-[480px]">
            <h1 className="text-4xl md:text-5xl font-mono text-white mb-6">
              Pesatone Terms of Use
            </h1>
            <p className="text-[#8A8A8B] text-lg leading-relaxed">
              Connect, Engage, and Earn Securely – African influencers, your
              journey to success starts here
            </p>
          </div>
          <div className="flex-shrink-0">
            <Image
              src="/happy-face.png"
              alt="Terms of Use"
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
        <TermsSection title="1. Acceptance of Terms">
          <p>
            By accessing or using Pesatone (&quot;the Platform&quot;), you agree to be
            bound by these Terms of Use (&quot;Terms&quot;). If you do not agree to these
            Terms, please do not use the Platform.
          </p>
          <p>
            To sign up for a Pesatone account, you need to be at least 18 years
            old, or old enough to form a binding contract where you live. If
            necessary, we may ask you for proof of age.
          </p>
        </TermsSection>

        <TermsSection title="2. About Creating an Account">
          <p>
            To use some of our features, you&apos;ll need to register, choose a
            username, and set a password. When you do that, the information you
            give us has to be accurate and complete. Don&apos;t impersonate anyone
            else or choose names that are offensive or that violate anyone&apos;s
            rights. If you don&apos;t follow these rules, we may cancel your account.
          </p>
          <p>
            You&apos;re responsible for all the activity on your account, and for
            keeping your password confidential. If you find out that someone has
            used your account without your permission, you should report it to{" "}
            <a
              href="mailto:support@pesatone.com"
              className="underline text-white hover:text-[#8A8A8B] transition-colors"
            >
              support@pesatone.com
            </a>
            .
          </p>
        </TermsSection>

        <TermsSection title="3. Acceptable Use">
          <p>
            You agree to use the Platform only for lawful purposes and in a way
            that does not infringe the rights of others or restrict or inhibit
            their use and enjoyment of the Platform. Prohibited behavior
            includes harassing or causing distress or inconvenience to any
            person, transmitting obscene or offensive content, or disrupting the
            normal flow of dialogue within the Platform.
          </p>
          <p>
            You must not misuse the Platform by knowingly introducing viruses,
            trojans, worms, logic bombs, or other material that is malicious or
            technologically harmful.
          </p>
        </TermsSection>

        <TermsSection title="4. Payments and Transactions">
          <p>
            Pesatone facilitates direct gifting and donations between fans and
            creators. All transactions processed through the Platform are
            subject to applicable fees, which will be clearly disclosed prior to
            completion of any transaction.
          </p>
          <p>
            You are solely responsible for ensuring the accuracy of all payment
            information you provide. Pesatone is not liable for any losses
            arising from incorrect payment details provided by you.
          </p>
          <p>
            All payments are processed through secure third-party payment
            processors. By making a payment, you agree to the terms and
            conditions of the relevant payment processor.
          </p>
        </TermsSection>

        <TermsSection title="5. Creator Responsibilities">
          <p>
            Creators using the Platform are responsible for all content they
            share and must ensure it complies with all applicable laws and
            regulations. Creators must accurately represent themselves and their
            content to their fans and supporters.
          </p>
          <p>
            Creators acknowledge that Pesatone may retain a service fee from
            transactions processed through the Platform. The applicable fee
            structure will be communicated to creators during the registration
            process and may be updated from time to time.
          </p>
        </TermsSection>

        <TermsSection title="6. Intellectual Property">
          <p>
            The Platform and its original content, features, and functionality
            are owned by Pesatone and are protected by international copyright,
            trademark, patent, trade secret, and other intellectual property
            laws.
          </p>
          <p>
            By posting content on the Platform, you grant Pesatone a
            non-exclusive, worldwide, royalty-free license to use, reproduce,
            modify, and distribute your content solely for the purpose of
            operating and improving the Platform.
          </p>
        </TermsSection>

        <TermsSection title="7. Privacy">
          <p>
            Your use of the Platform is also governed by our{" "}
            <a
              href="/privacy-policy"
              className="underline text-white hover:text-[#8A8A8B] transition-colors"
            >
              Privacy Policy
            </a>
            , which is incorporated into these Terms by reference. Please review
            our Privacy Policy to understand our practices regarding the
            collection and use of your personal information.
          </p>
        </TermsSection>

        <TermsSection title="8. Disclaimers and Limitation of Liability">
          <p>
            The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis
            without any warranties of any kind. Pesatone does not warrant that
            the Platform will be uninterrupted, error-free, or free of viruses
            or other harmful components.
          </p>
          <p>
            To the fullest extent permitted by law, Pesatone shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of, or inability to use, the
            Platform.
          </p>
        </TermsSection>

        <TermsSection title="9. Termination">
          <p>
            We reserve the right to suspend or terminate your account and access
            to the Platform at our sole discretion, without notice, for conduct
            that we believe violates these Terms or is harmful to other users,
            us, third parties, or for any other reason.
          </p>
        </TermsSection>

        <TermsSection title="10. Changes to These Terms">
          <p>
            We may update these Terms from time to time. We will notify you of
            any significant changes by posting the new Terms on this page and
            updating the effective date. Your continued use of the Platform
            after such changes constitutes your acceptance of the new Terms.
          </p>
        </TermsSection>

        <TermsSection title="11. Contact Us">
          <p>
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@pesatone.com"
              className="underline text-white hover:text-[#8A8A8B] transition-colors"
            >
              support@pesatone.com
            </a>
            .
          </p>
        </TermsSection>
      </section>

      <Footer />
    </div>
  );
}

function TermsSection({
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

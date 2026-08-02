import Footer from "./Footer";
import Navbar from "./Navbar";
import Image from "next/image";

export type LegalSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export default function LegalDocument({
  title,
  subtitle,
  imageAlt,
  sections,
}: {
  title: string;
  subtitle: string;
  imageAlt: string;
  sections: LegalSection[];
}) {
  return (
    <div className="py-12 md:py-14 lg:py-[73px]">
      <Navbar />
      <section className="page-padding pt-16 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-[480px]">
            <h1 className="text-4xl md:text-5xl font-mono text-white mb-6">{title}</h1>
            <p className="text-[#8A8A8B] text-lg leading-relaxed">{subtitle}</p>
          </div>
          <Image src="/happy-face.png" alt={imageAlt} width={380} height={380} className="object-contain" priority />
        </div>
      </section>
      <section className="page-padding max-w-[860px] flex flex-col gap-10 pb-24">
        {sections.map((section) => (
          <div className="flex flex-col gap-4" key={section.title}>
            <h2 className="text-white font-bold text-lg">{section.title}</h2>
            <div className="flex flex-col gap-3 text-[#C0C0C2] leading-relaxed text-base">
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets?.length ? (
                <ul className="list-disc pl-6 flex flex-col gap-2">
                  {section.bullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : null}
            </div>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}

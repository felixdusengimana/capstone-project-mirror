import LegalDocument, { LegalSection } from "@/components/organisms/LegalDocument";
import { getTranslations } from "next-intl/server";

export default async function TermsOfUsePage() {
  const t = await getTranslations("legal");
  return (
    <LegalDocument
      title={t("termsTitle")}
      subtitle={t("subtitle")}
      imageAlt={t("termsAlt")}
      sections={t.raw("termsSections") as LegalSection[]}
    />
  );
}

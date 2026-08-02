import LegalDocument, { LegalSection } from "@/components/organisms/LegalDocument";
import { getTranslations } from "next-intl/server";

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("legal");
  return (
    <LegalDocument
      title={t("privacyTitle")}
      subtitle={t("subtitle")}
      imageAlt={t("privacyAlt")}
      sections={t.raw("privacySections") as LegalSection[]}
    />
  );
}

import LegalContent from "@/components/home-components/LegalContent";
import { getPageBySlug } from "@/service/cms";

export const dynamic = "force-dynamic";

export const metadata = { title: "Terms of Use" };

export default async function TermsPage() {
  const res = await getPageBySlug("terms-of-use");
  const all: any[] = res?.data?.sections ?? [];

  const hero = all.find((s) => s.sectionType === "HERO");
  const cta = all.find((s) => s.sectionType === "CTA");
  const legal = all
    .filter((s) => s.sectionType === "LEGAL" && s.content?.title)
    .map((s) => ({ title: s.content.title, body: s.content.body ?? "" }));

  return (
    <LegalContent
      slugBase="terms"
      heroContent={hero?.content ?? {}}
      sections={legal}
      ctaContent={cta?.content ?? {}}
    />
  );
}
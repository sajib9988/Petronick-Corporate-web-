
import ContactContent from "@/components/home-components/Contactcontent ";
import { getPageBySlug } from "@/service/cms";

export const dynamic = "force-dynamic";

type PageSection = {
  sectionType: string;
  sortOrder?: number;
  image?: string | null;
  imageVisible?: boolean;
  content?: Record<string, string> | null;
};

// Image only shows when the admin's "Image Visibility" toggle is on.
function visibleImage(section?: PageSection) {
  if (!section?.image) return null;
  return section.imageVisible === false ? null : section.image;
}

export default async function ContactPage() {
  const pageRes = await getPageBySlug("contact-page");

  // API returns sections already sorted by sortOrder (asc)
  const sections: PageSection[] = pageRes?.data?.sections ?? [];

  const ofType = (type: string) =>
    sections.filter((s) => s.sectionType === type);

  const heroSection = ofType("HERO")[0];
  const contactSection = ofType("CONTACT")[0];
  const pathwayHeaderSection = ofType("STATS")[0];
  const [pathway1, pathway2] = ofType("FEATURE"); // sortOrder 0, 1
  const ctaSection = ofType("CTA")[0];

  return (
    <ContactContent
      heroImage={visibleImage(heroSection)}
      heroContent={heroSection?.content ?? {}}
      contactContent={contactSection?.content ?? {}}
      pathwayHeader={pathwayHeaderSection?.content ?? {}}
      pathway1={pathway1?.content ?? {}}
      pathway2={pathway2?.content ?? {}}
      ctaImage={visibleImage(ctaSection)}
      ctaContent={ctaSection?.content ?? {}}
    />
  );
}
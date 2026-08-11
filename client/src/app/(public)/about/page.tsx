import { getPageBySlug } from "@/service/cms";
import AboutContent from "@/components/home-components/AboutContent";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const pageRes = await getPageBySlug("about-page");

  const sections = pageRes?.data?.sections ?? [];

  const heroSection = sections.find(
    (s: any) => s.sectionType === "HERO"
  );

  const aboutSection = sections.find(
    (s: any) => s.sectionType === "ABOUT"
  );

  const snapshotSection = sections.find(
    (s: any) => s.sectionType === "SNAPSHOT"
  );

  const valuesSection = sections.find(
    (s: any) => s.sectionType === "VALUES"
  );

  const ctaSection = sections.find(
    (s: any) => s.sectionType === "CTA"
  );

  return (
    <AboutContent
      heroImage={heroSection?.image}
      heroContent={heroSection?.content ?? {}}
      aboutContent={aboutSection?.content ?? {}}
      snapshotContent={snapshotSection?.content ?? {}}
      valuesContent={valuesSection?.content ?? {}}
      ctaContent={ctaSection?.content ?? {}}
    />
  );
}
import { getPageBySlug } from "@/service/cms";
import AboutContent from "@/components/home-components/AboutContent";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const pageRes = await getPageBySlug("about-page");
  const sections = pageRes?.data?.sections ?? [];

  const heroSection = sections.find((s: any) => s.sectionType === "HERO");
  const aboutSection = sections.find((s: any) => s.sectionType === "ABOUT");
  const ctaSection = sections.find((s: any) => s.sectionType === "CTA");
  const featureSections = sections
    .filter((s: any) => s.sectionType === "FEATURE")
    .sort((a: any, b: any) => a.sortOrder - b.sortOrder);

  return (
    <AboutContent
      heroImage={heroSection?.image}
      heroContent={heroSection?.content ?? {}}
      aboutContent={aboutSection?.content ?? {}}
      ctaContent={ctaSection?.content ?? {}}
      values={featureSections.map((s: any) => ({
        title: s.content?.title,
        desc: s.content?.description,
      }))}
    />
  );
}
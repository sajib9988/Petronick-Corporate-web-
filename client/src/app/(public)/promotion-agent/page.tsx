import PromotionAgentContent from "@/components/home-components/PromotionAgentContent";
import { getPageBySlug } from "@/service/cms";

export const dynamic = "force-dynamic";

function visibleImage(section?: {
  image?: string | null;
  imageVisible?: boolean;
}) {
  if (!section?.image) return null;
  return section.imageVisible === false ? null : section.image;
}

export default async function PromotionAgentPage() {
  const pageRes = await getPageBySlug("promotion-agent");
  const sections = pageRes?.data?.sections ?? [];

  // sob HERO sortOrder onujayi (service already asc e pathay)
  const heroSections = sections.filter(
    (s: any) => s.sectionType === "HERO"
  );
  const heroSection = heroSections[0];
  const heroSection1 = heroSections[1];

  const find = (type: string) =>
    sections.find((s: any) => s.sectionType === type);

  return (
    <PromotionAgentContent
      heroContent={heroSection?.content ?? {}}
      heroImage={visibleImage(heroSection)}
      heroContent1={heroSection1?.content ?? {}}
      heroImage1={visibleImage(heroSection1)}
      whyJoinContent={find("BENEFITS")?.content ?? {}}
      processContent={find("PROCESS")?.content ?? {}}
      snapshotContent={find("SNAPSHOT")?.content ?? {}}
      applicationContent={find("APPLICATION")?.content ?? {}}
      closingContent={find("CLOSING")?.content ?? {}}
    />
  );
}
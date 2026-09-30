import PromotionAgentContent from "@/components/home-components/PromotionAgentContent";
import { getPageBySlug } from "@/service/cms";

export const dynamic = "force-dynamic";

export default async function PromotionAgentPage() {
  const pageRes = await getPageBySlug("promotion-agent");

  const sections = pageRes?.data?.sections ?? [];

  const heroSection = sections.find(
    (section: any) => section.sectionType === "HERO"
  );

const  whyJoinSection = sections.find(
  (section: any) => section.sectionType === "BENEFITS"
);




  return (
    <PromotionAgentContent
      heroContent={heroSection?.content ?? {}}
      whyJoinContent={whyJoinSection?.content ?? {}}
    />
  );
}

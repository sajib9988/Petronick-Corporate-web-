import PromotionAgentContent from "@/components/home-components/PromotionAgentContent";
import { getPageBySlug } from "@/service/cms";


export const dynamic = "force-dynamic";

export default async function PromotionAgentPage() {
  const pageRes = await getPageBySlug("promotion-agent");
  const sections = pageRes?.data?.sections ?? [];

  const heroSection = sections.find((s: any) => s.sectionType === "HERO");
  const benefitsSection = sections.find((s: any) => s.sectionType === "BENEFITS");
  const processSection = sections.find((s: any) => s.sectionType === "PROCESS");
  const applicationSection = sections.find((s: any) => s.sectionType === "APPLICATION");
  const ctaSection = sections.find((s: any) => s.sectionType === "CTA");

  return (
    <PromotionAgentContent
      heroContent={heroSection?.content ?? {}}
      benefitsContent={benefitsSection?.content ?? {}}
      processContent={processSection?.content ?? {}}
      applicationContent={applicationSection?.content ?? {}}
      ctaContent={ctaSection?.content ?? {}}
    />
  );
}
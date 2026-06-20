export type SectionType =
  | "HERO"
  | "ABOUT"
  | "CTA"
  | "FEATURE"
  | "TESTIMONIALS"
  | "GALLERY"
  | "CONTACT"
  | "WHO_WE_ARE"
  | "ECOSYSTEM"
  | "REVENUE"
  | "CLOSING";

export const SECTION_TYPES: SectionType[] = [
  "HERO",
  "WHO_WE_ARE",
  "ECOSYSTEM",
  "REVENUE",
  "CLOSING",
  "ABOUT",
  "CTA",
  "FEATURE",
  "TESTIMONIALS",
  "GALLERY",
  "CONTACT",
];

export const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  HERO: "Hero / Banner",
  WHO_WE_ARE: "Who We Are",
  ECOSYSTEM: "Our Ecosystem",
  REVENUE: "Revenue / Partner",
  CLOSING: "Closing Authority",
  ABOUT: "About",
  CTA: "Call to Action",
  FEATURE: "Feature",
  TESTIMONIALS: "Testimonials",
  GALLERY: "Gallery",
  CONTACT: "Contact",
};

export const FIELDS: Record<
  SectionType,
  { key: string; label: string; multiline?: boolean }[]
> = {
  // ─── Hero Section ────────────────────────────────────────
  HERO: [
    { key: "headline", label: "Headline" },
    { key: "subheadline", label: "Subheadline", multiline: true },
    { key: "primaryBtn", label: "Primary Button Text" },
    { key: "primaryBtnLink", label: "Primary Button Link" },
    { key: "secondaryBtn", label: "Secondary Button Text" },
    { key: "secondaryBtnLink", label: "Secondary Button Link" },
  ],

  // ─── Who We Are Section ──────────────────────────────────
  // PDF: Short executive overview
  WHO_WE_ARE: [
    { key: "title", label: "Section Title" },
    { key: "paragraph", label: "Main Paragraph", multiline: true },
    { key: "bullet1", label: "Bullet Point 1" },
    { key: "bullet2", label: "Bullet Point 2" },
    { key: "bullet3", label: "Bullet Point 3" },
    { key: "bullet4", label: "Bullet Point 4" },
  ],

  // ─── Ecosystem Section ───────────────────────────────────
  // PDF: Show synergy between entities
  ECOSYSTEM: [
    { key: "title", label: "Section Title" },
    { key: "subtitle", label: "Subtitle" },
    {
      key: "description",
      label: "Description (companies DB থেকে আসবে)",
      multiline: true,
    },
  ],

  // ─── Revenue / Partner Section ───────────────────────────
  // PDF: Attract Promotion Agents
  REVENUE: [
    { key: "headline", label: "Headline" },
    { key: "paragraph", label: "Paragraph", multiline: true },
    { key: "btnText", label: "Button Text" },
    { key: "btnLink", label: "Button Link" },
  ],

  // ─── Closing Authority Section ───────────────────────────
  // PDF: Short reinforcing statement
  CLOSING: [
    { key: "headline", label: "Headline" },
    { key: "paragraph", label: "Paragraph", multiline: true },
    { key: "ctaText", label: "CTA Text (optional)" },
    { key: "ctaLink", label: "CTA Link (optional)" },
  ],

  // ─── Other existing sections ─────────────────────────────
  ABOUT: [
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Subtitle" },
    { key: "body", label: "Body", multiline: true },
  ],

  CTA: [
    { key: "title", label: "Title" },
    { key: "description", label: "Description", multiline: true },
    { key: "btnText", label: "Button Text" },
    { key: "btnLink", label: "Button Link" },
  ],

  FEATURE: [
    { key: "title", label: "Title" },
    { key: "description", label: "Description", multiline: true },
    { key: "icon", label: "Icon (optional)" },
  ],

  TESTIMONIALS: [
    { key: "title", label: "Section Title" },
    { key: "authorName", label: "Author Name" },
    { key: "authorTitle", label: "Author Title" },
    { key: "quote", label: "Quote", multiline: true },
  ],

  GALLERY: [
    { key: "title", label: "Gallery Title" },
    { key: "caption", label: "Caption (optional)" },
  ],

  CONTACT: [
    { key: "title", label: "Title" },
    { key: "subtitle", label: "Subtitle", multiline: true },
    { key: "email", label: "Contact Email" },
    { key: "phone", label: "Phone (optional)" },
  ],
};
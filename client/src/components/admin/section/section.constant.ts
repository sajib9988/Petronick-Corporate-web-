export type SectionType =
  | "HERO"
  | "ABOUT"
  | "CTA"
  | "FEATURE"
  | "TESTIMONIALS"
  | "GALLERY"
  | "CONTACT";

export const SECTION_TYPES: SectionType[] = [
  "HERO",
  "ABOUT",
  "CTA",
  "FEATURE",
  "TESTIMONIALS",
  "GALLERY",
  "CONTACT",
];

export const FIELDS: Record<
  SectionType,
  { key: string; label: string; multiline?: boolean }[]
> = {
  HERO: [
    { key: "headline", label: "Headline" },
    { key: "subheadline", label: "Subheadline", multiline: true },
    { key: "primaryBtn", label: "Primary Button" },
    { key: "primaryBtnLink", label: "Primary Button Link" },
    { key: "secondaryBtn", label: "Secondary Button" },
    { key: "secondaryBtnLink", label: "Secondary Button Link" },
  ],
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
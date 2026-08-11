// ============================================================
// SECTION TYPES
// ============================================================

export type SectionType =
  | "HERO"
  | "ABOUT"
  | "CTA"
  | "FEATURE"
  | "SNAPSHOT"
  | "VALUES"
  | "TESTIMONIALS"
  | "GALLERY"
  | "CONTACT"
  | "WHO_WE_ARE"
  | "ECOSYSTEM"
  | "REVENUE"
  | "CLOSING";

// ============================================================
// SECTION TYPES LIST
// ============================================================

export const SECTION_TYPES: SectionType[] = [
  "HERO",
  "WHO_WE_ARE",
  "ECOSYSTEM",
  "REVENUE",
  "CLOSING",
  "ABOUT",
  "SNAPSHOT",
  "VALUES",
  "FEATURE",
  "CTA",
  "TESTIMONIALS",
  "GALLERY",
  "CONTACT",
];

// ============================================================
// SECTION TYPE LABELS
// ============================================================

export const SECTION_TYPE_LABELS: Record<SectionType, string> = {
  HERO: "Hero / Banner",

  WHO_WE_ARE: "Who We Are",

  ECOSYSTEM: "Our Ecosystem",

  REVENUE: "Revenue / Partner",

  CLOSING: "Closing Authority",

  ABOUT: "About",

  SNAPSHOT: "Corporate Snapshot",

  VALUES: "Our Values",

  FEATURE: "Feature",

  CTA: "Call to Action",

  TESTIMONIALS: "Testimonials",

  GALLERY: "Gallery",

  CONTACT: "Contact",
};

// ============================================================
// DYNAMIC FIELDS
// ============================================================

export const FIELDS: Record<
  SectionType,
  {
    key: string;
    label: string;
    multiline?: boolean;
  }[]
> = {
  // ==========================================================
  // HERO
  // ==========================================================

  HERO: [
    {
      key: "badge",
      label: "Badge",
    },

    {
      key: "headline",
      label: "Headline",
    },

    {
      key: "subheadline",
      label: "Subheadline",
      multiline: true,
    },

    {
      key: "primaryBtn",
      label: "Primary Button Text",
    },

    {
      key: "primaryBtnLink",
      label: "Primary Button Link",
    },

    {
      key: "secondaryBtn",
      label: "Secondary Button Text",
    },

    {
      key: "secondaryBtnLink",
      label: "Secondary Button Link",
    },
  ],

  // ==========================================================
  // WHO WE ARE
  // ==========================================================

  WHO_WE_ARE: [
    {
      key: "title",
      label: "Section Title",
    },

    {
      key: "paragraph",
      label: "Main Paragraph",
      multiline: true,
    },

    {
      key: "bullet1",
      label: "Bullet Point 1",
    },

    {
      key: "bullet2",
      label: "Bullet Point 2",
    },

    {
      key: "bullet3",
      label: "Bullet Point 3",
    },

    {
      key: "bullet4",
      label: "Bullet Point 4",
    },
  ],

  // ==========================================================
  // ECOSYSTEM
  // ==========================================================

  ECOSYSTEM: [
    {
      key: "title",
      label: "Section Title",
    },

    {
      key: "subtitle",
      label: "Subtitle",
    },

    {
      key: "description",
      label: "Description (Companies DB থেকে আসবে)",
      multiline: true,
    },
  ],

  // ==========================================================
  // REVENUE / PARTNER
  // ==========================================================

  REVENUE: [
    {
      key: "label",
      label: "Badge Label",
    },

    {
      key: "headline",
      label: "Headline",
    },

    {
      key: "paragraph",
      label: "Paragraph",
      multiline: true,
    },

    {
      key: "btnText",
      label: "Button Text",
    },

    {
      key: "btnLink",
      label: "Button Link",
    },
  ],

  // ==========================================================
  // CLOSING AUTHORITY
  // ==========================================================

  CLOSING: [
    {
      key: "headline",
      label: "Headline",
    },

    {
      key: "paragraph",
      label: "Paragraph",
      multiline: true,
    },

    {
      key: "badge1",
      label: "Badge 1",
    },

    {
      key: "badge2",
      label: "Badge 2",
    },

    {
      key: "badge3",
      label: "Badge 3",
    },

    {
      key: "ctaText",
      label: "CTA Text",
    },

    {
      key: "ctaLink",
      label: "CTA Link",
    },
  ],

  // ==========================================================
  // ABOUT
  // ==========================================================

  ABOUT: [
    {
      key: "title",
      label: "Title",
    },

    {
      key: "subtitle",
      label: "Subtitle",
    },

    {
      key: "body",
      label: "Body",
      multiline: true,
    },

    {
      key: "btnText",
      label: "Button Text",
    },

    {
      key: "btnLink",
      label: "Button Link",
    },
  ],

  // ==========================================================
  // CORPORATE SNAPSHOT
  // ==========================================================

  SNAPSHOT: [
    {
      key: "title",
      label: "Section Title",
    },

    {
      key: "entityType",
      label: "Entity Type",
    },

    {
      key: "headquarters",
      label: "Headquarters",
    },

    {
      key: "structure",
      label: "Structure",
    },

    {
      key: "businessModel",
      label: "Business Model",
    },

    {
      key: "industryFocus",
      label: "Industry Focus",
    },
  ],

  // ==========================================================
  // VALUES
  // ==========================================================

VALUES: [
  {
    key: "label",
    label: "Section Label",
  },
  {
    key: "title",
    label: "Section Title",
  },

  {
    key: "value1Title",
    label: "Value 1 Title",
  },
  {
    key: "value1Description",
    label: "Value 1 Description",
    multiline: true,
  },

  {
    key: "value2Title",
    label: "Value 2 Title",
  },
  {
    key: "value2Description",
    label: "Value 2 Description",
    multiline: true,
  },

  {
    key: "value3Title",
    label: "Value 3 Title",
  },
  {
    key: "value3Description",
    label: "Value 3 Description",
    multiline: true,
  },

  {
    key: "value4Title",
    label: "Value 4 Title",
  },
  {
    key: "value4Description",
    label: "Value 4 Description",
    multiline: true,
  },
],

  // ==========================================================
  // FEATURE
  // ==========================================================

  FEATURE: [
    {
      key: "title",
      label: "Title",
    },

    {
      key: "description",
      label: "Description",
      multiline: true,
    },

    {
      key: "icon",
      label: "Icon (optional)",
    },
  ],

  // ==========================================================
  // CTA
  // ==========================================================

  CTA: [
    {
      key: "title",
      label: "Title",
    },

    {
      key: "description",
      label: "Description",
      multiline: true,
    },

    {
      key: "btnText",
      label: "Primary Button Text",
    },

    {
      key: "btnLink",
      label: "Primary Button Link",
    },

    {
      key: "secondaryBtnText",
      label: "Secondary Button Text",
    },

    {
      key: "secondaryBtnLink",
      label: "Secondary Button Link",
    },
  ],

  // ==========================================================
  // TESTIMONIALS
  // ==========================================================

  TESTIMONIALS: [
    {
      key: "title",
      label: "Section Title",
    },

    {
      key: "authorName",
      label: "Author Name",
    },

    {
      key: "authorTitle",
      label: "Author Title",
    },

    {
      key: "quote",
      label: "Quote",
      multiline: true,
    },
  ],

  // ==========================================================
  // GALLERY
  // ==========================================================

  GALLERY: [
    {
      key: "title",
      label: "Gallery Title",
    },

    {
      key: "caption",
      label: "Caption (optional)",
    },
  ],

  // ==========================================================
  // CONTACT
  // ==========================================================

  CONTACT: [
    {
      key: "badge",
      label: "Badge",
    },

    {
      key: "title",
      label: "Title",
    },

    {
      key: "subtitle",
      label: "Subtitle",
      multiline: true,
    },

    {
      key: "email",
      label: "Contact Email",
    },

    {
      key: "website",
      label: "Website",
    },

    {
      key: "phone",
      label: "Phone",
    },

    {
      key: "location",
      label: "Location",
    },

    {
      key: "aboutLabel",
      label: "About Label",
    },

    {
      key: "aboutDescription",
      label: "About Description",
      multiline: true,
    },

    {
      key: "formTitle",
      label: "Form Title",
    },

    {
      key: "formDescription",
      label: "Form Description",
      multiline: true,
    },
  ],
};
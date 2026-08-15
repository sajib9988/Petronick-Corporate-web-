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
  | "BENEFITS"
  | "PROCESS"
  | "STATS"
  | "APPLICATION"
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

  "BENEFITS",
  "PROCESS",
  "STATS",
  "APPLICATION",

  "FEATURE",
  "CTA",
  "TESTIMONIALS",
  "GALLERY",
  "CONTACT",
];

// ============================================================
// SECTION TYPE LABELS
// ============================================================

export const SECTION_TYPE_LABELS: Record<
  SectionType,
  string
> = {
  HERO: "Hero / Banner",

  WHO_WE_ARE: "Who We Are",

  ECOSYSTEM: "Our Ecosystem",

  REVENUE: "Revenue / Partner",

  CLOSING: "Closing Authority",

  ABOUT: "About",

  SNAPSHOT: "Corporate Snapshot",

  VALUES: "Our Values",

  BENEFITS: "Benefits / Why Join",

  PROCESS: "Process / How It Works",

  STATS: "Stats Bar",

  APPLICATION:
    "Application Panel (Left Side + Form Header)",

  FEATURE: "Feature",

  CTA: "Call to Action",

  TESTIMONIALS: "Testimonials",

  GALLERY: "Gallery",

  CONTACT: "Contact",
};

// ============================================================
// FIELD TYPE
// ============================================================

export type SectionField = {
  key: string;
  label: string;
  multiline?: boolean;
};

// ============================================================
// DYNAMIC FIELDS
// ============================================================

export const FIELDS: Record<
  SectionType,
  SectionField[]
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
      label:
        "Headline (fallback, other pages use this)",
    },

    {
      key: "headlinePrefix",
      label:
        "Headline Prefix (e.g. 'Become')",
    },

    {
      key: "headlineAccent",
      label:
        "Headline Accent / Gradient Part",
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
      label:"Description",
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
  // BENEFITS
  // ==========================================================

  BENEFITS: [
    {
      key: "badge",
      label: "Badge",
    },

    {
      key: "title",
      label: "Section Title",
    },

    {
      key: "subtitle",
      label: "Subtitle",
      multiline: true,
    },

    // --------------------------------------------------------
    // BENEFIT 1
    // --------------------------------------------------------

    {
      key: "benefit1Icon",
      label:
        "Benefit 1 Icon (TrendingUp/Users/Zap...)",
    },

    {
      key: "benefit1Title",
      label: "Benefit 1 Title",
    },

    {
      key: "benefit1Description",
      label: "Benefit 1 Description",
      multiline: true,
    },

    // --------------------------------------------------------
    // BENEFIT 2
    // --------------------------------------------------------

    {
      key: "benefit2Icon",
      label:
        "Benefit 2 Icon (TrendingUp/Users/Zap...)",
    },

    {
      key: "benefit2Title",
      label: "Benefit 2 Title",
    },

    {
      key: "benefit2Description",
      label: "Benefit 2 Description",
      multiline: true,
    },

    // --------------------------------------------------------
    // BENEFIT 3
    // --------------------------------------------------------

    {
      key: "benefit3Icon",
      label:
        "Benefit 3 Icon (TrendingUp/Users/Zap...)",
    },

    {
      key: "benefit3Title",
      label: "Benefit 3 Title",
    },

    {
      key: "benefit3Description",
      label: "Benefit 3 Description",
      multiline: true,
    },

    // --------------------------------------------------------
    // STATS INSIDE BENEFITS
    // --------------------------------------------------------

    {
      key: "statValue1",
      label: "Stat 1 Value",
    },

    {
      key: "statLabel1",
      label: "Stat 1 Label",
    },

    {
      key: "statValue2",
      label: "Stat 2 Value",
    },

    {
      key: "statLabel2",
      label: "Stat 2 Label",
    },

    {
      key: "statValue3",
      label: "Stat 3 Value",
    },

    {
      key: "statLabel3",
      label: "Stat 3 Label",
    },
  ],

  // ==========================================================
  // PROCESS
  // ==========================================================

  PROCESS: [
    {
      key: "badge",
      label: "Badge Label",
    },

    {
      key: "title",
      label: "Section Title",
    },

    {
      key: "subtitle",
      label: "Subtitle",
      multiline: true,
    },

    // --------------------------------------------------------
    // STEP 1
    // --------------------------------------------------------

    {
      key: "step1Icon",
      label:
        "Step 1 Icon (FileText/Users/Handshake/Rocket...)",
    },

    {
      key: "step1Title",
      label: "Step 1 Title",
    },

    {
      key: "step1Description",
      label: "Step 1 Description",
      multiline: true,
    },

    // --------------------------------------------------------
    // STEP 2
    // --------------------------------------------------------

    {
      key: "step2Icon",
      label: "Step 2 Icon",
    },

    {
      key: "step2Title",
      label: "Step 2 Title",
    },

    {
      key: "step2Description",
      label: "Step 2 Description",
      multiline: true,
    },

    // --------------------------------------------------------
    // STEP 3
    // --------------------------------------------------------

    {
      key: "step3Icon",
      label: "Step 3 Icon",
    },

    {
      key: "step3Title",
      label: "Step 3 Title",
    },

    {
      key: "step3Description",
      label: "Step 3 Description",
      multiline: true,
    },

    // --------------------------------------------------------
    // STEP 4
    // --------------------------------------------------------

    {
      key: "step4Icon",
      label: "Step 4 Icon",
    },

    {
      key: "step4Title",
      label: "Step 4 Title",
    },

    {
      key: "step4Description",
      label: "Step 4 Description",
      multiline: true,
    },
  ],

  // ==========================================================
  // STATS
  // ==========================================================

  STATS: [
    {
      key: "statValue1",
      label: "Stat 1 Value",
    },

    {
      key: "statLabel1",
      label: "Stat 1 Label",
    },

    {
      key: "statValue2",
      label: "Stat 2 Value",
    },

    {
      key: "statLabel2",
      label: "Stat 2 Label",
    },

    {
      key: "statValue3",
      label: "Stat 3 Value",
    },

    {
      key: "statLabel3",
      label: "Stat 3 Label",
    },
  ],

  // ==========================================================
  // APPLICATION
  // ==========================================================

  APPLICATION: [
    {
      key: "badge",
      label: "Eyebrow / Badge",
    },

    {
      key: "title",
      label: "Left Panel Title",
    },

    {
      key: "description",
      label: "Left Panel Description",
      multiline: true,
    },

    {
      key: "checklist1",
      label: "Checklist Item 1",
    },

    {
      key: "checklist2",
      label: "Checklist Item 2",
    },

    {
      key: "checklist3",
      label: "Checklist Item 3",
    },

    {
      key: "checklist4",
      label: "Checklist Item 4",
    },

    {
      key: "formPanelTitle",
      label: "Form Panel Title",
    },

    {
      key: "formPanelDescription",
      label: "Form Panel Subtitle",
    },

    {
      key: "noteTitle",
      label: "Note Box Title",
    },

    {
      key: "noteDescription",
      label: "Note Box Description",
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
      key: "eyebrow",
      label: "Eyebrow / Small Label",
    },

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
export interface ICreatepage{
id:string,    
slug:string,
title:string,
}


export type section ={
    id:string,
    sectionType:string,
    content: Record<string, unknown>,
    image?: string | null,
    sortOrder:number,
    isVisible:boolean,
    createdAt:string,
}

export type page={
    id:string,
    slug:string,
    title:string,
}

export const TYPE_LABELS: Record<string, string> = {
    "HERO": "Hero / Banner",
    "WHO_WE_ARE": "Who We Are Section",
    "ECOSYSTEM": "Our Ecosystem",
    "REVENUE": "Revenue / Partner",
    "CLOSING": "Closing Authority",
    "ABOUT": "About",
    "SNAPSHOT": "Corporate Snapshot",
    "VALUES": "Our Values",
    "BENEFITS": "Benefits / Why Join",
    "PROCESS": "Process / How It Works",
    "STATS": "Stats Bar",
    "APPLICATION": "Application Panel",
    "CTA": "Call To Action",
    "FEATURE": "Feature",
    "CONTACT": "Contact",
    "TESTIMONIALS": "Testimonials",
    "GALLERY": "Gallery",
}

export const TYPE_COLORS: Record<string, string> = {
    "HERO": "bg-blue-100 text-blue-800",
    "WHO_WE_ARE": "bg-green-100 text-green-800",
    "ECOSYSTEM": "bg-yellow-100 text-yellow-800",
    "REVENUE": "bg-purple-100 text-purple-800",
    "CLOSING": "bg-red-100 text-red-800",
    "ABOUT": "bg-teal-100 text-teal-800",
    "SNAPSHOT": "bg-lime-100 text-lime-800",
    "VALUES": "bg-fuchsia-100 text-fuchsia-800",
    "BENEFITS": "bg-emerald-100 text-emerald-800",
    "PROCESS": "bg-sky-100 text-sky-800",
    "STATS": "bg-rose-100 text-rose-800",
    "APPLICATION": "bg-violet-100 text-violet-800",
    "CTA": "bg-orange-100 text-orange-800",
    "FEATURE": "bg-indigo-100 text-indigo-800",
    "CONTACT": "bg-pink-100 text-pink-800",
    "TESTIMONIALS": "bg-gray-100 text-gray-800",
    "GALLERY": "bg-cyan-100 text-cyan-800",
}


export type Company = {
  id: string;
  name: string;
  description: string;
  logo: string;
  icon: string | null;
  website: string | null;
  revenueStage: string | null;
  order: number;
  isVisible: boolean;
  createdAt: string;
};
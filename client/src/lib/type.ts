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

export const TYPE_LABELS: Record<string, string>={
    "HERO":"Hero /Banner",
    "WHO_WE_ARE":"Who We Are Section",
    "ECOSYSTEM":"Our Ecosystem",
    "REVIEW":"Review /Partner",
    "CLOSING": "Closing Authority",
    "ABOUT":"About",
    "CTA":"Call To Action",
    "FEATURES":"Features",
    "CONTACT":"Contact",
     "TESTIMONIALS":"Testimonials",
     "GALLERY":"Gallery",
}

export const TYPE_COLORS: Record<string, string>= {
    "HERO":"bg-blue-100 text-blue-800",
    "WHO_WE_ARE":"bg-green-100 text-green-800",
    "ECOSYSTEM":"bg-yellow-100 text-yellow-800",
    "REVIEW":"bg-purple-100 text-purple-800",
    "CLOSING": "bg-red-100 text-red-800",
    "ABOUT":"bg-teal-100 text-teal-800",
    "CTA":"bg-orange-100 text-orange-800",
    "FEATURES":"bg-indigo-100 text-indigo-800",
    "CONTACT":"bg-pink-100 text-pink-800",
    "TESTIMONIALS":"bg-gray-100 text-gray-800",
    "GALLERY":"bg-cyan-100 text-cyan-800",
    
}
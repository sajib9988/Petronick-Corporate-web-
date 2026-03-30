import { Prisma } from "../../../generated/prisma-client";

export interface ICreatepage{
slug:string,
title:string,
}

export interface ICreateSection {
  pageId: string;
  type: 'HERO' | 'ABOUT' | "CTA" | "TESTIMONIALS" | "GALLERY" | "CONTACT" | "FEATURE";
  content: Prisma.InputJsonValue; // ✅
  image?: string;
  order?: number; // ✅
  isVisible?: boolean;
}

export interface IUpdateSection {
  type?: 'HERO' | 'ABOUT' | "CTA" | "TESTIMONIALS" | "GALLERY" | "CONTACT" | "FEATURE";
  content?: Prisma.InputJsonValue; // ✅
  image?: string;
  order?: number;
  isVisible?: boolean;
}

export interface IUpdatePage {
  title?: string;
}



export interface IPageQuery {
  slug?: string;
}

export interface ISectionQuery {
  pageId?: string;
  type?: string;
  isVisible?: string;
}


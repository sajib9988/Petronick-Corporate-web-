import { Prisma, SectionType } from "../../../generated/prisma-client";

export interface ICreatepage{
slug:string,
title:string,
}

export interface ICreateSection {
  pageId: string;
  type: SectionType; // ✅ no manual string union
  content: Prisma.InputJsonValue;
  image?: string;
  order?: number;
  isVisible?: boolean;
}


export interface IUpdateSection {
  type?: SectionType; // ✅
  content?: Prisma.InputJsonValue;
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


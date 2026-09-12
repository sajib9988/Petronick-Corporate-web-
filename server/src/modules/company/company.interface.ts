export interface IcreateCompany {
  name: string;
  description: string;
  logo: string;
  icon?: string | null;
  website?: string | null;
  order?: number;
  isVisible?: boolean;
  category?: string;
}

export interface IupdateCompany {
  name?: string;
  description?: string;
  logo?: string;
  icon?: string;
  website?: string;
  order?: number;
  isVisible?: boolean;
  category?: string;
}

export interface ICompanyQuery {
  page?: string;
  limit?: string;
  search?: string;
  isVisible?: string;
}
export interface ICreateContact {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface IContactQuery {
  page?: string;
  limit?: string;
  search?: string;
}
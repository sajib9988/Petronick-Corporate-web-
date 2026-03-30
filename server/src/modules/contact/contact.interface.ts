export interface ICreateContact {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface IContactQuery {
  page?: string;
  limit?: string;
  search?: string;
}
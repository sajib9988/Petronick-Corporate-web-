import { Role } from "../../../generated/prisma-client/index.js";



export interface IRequestUser {
  id: string;
  role: Role | string;
  email: string;
}
export interface ILoginUserPayload {
    email: string;
    password: string;
}

export interface IRegisterUserPayload {
    name: string;
    email: string;
    password: string;
}

export interface IChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
}

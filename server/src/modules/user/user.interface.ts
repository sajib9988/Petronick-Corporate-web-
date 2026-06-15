export interface IUpdateUserRole{
    role: "SUPER_ADMIN" | "ADMIN" | "USER"
}

export interface IUserQuery{
    page?:string;
    limit?:string;
    search?:string;
    skip?:number;
}
import httpStatus from "http-status";
import { prisma } from "../../database/prisma.js";
import { AppError } from "../../shared/errors/app-error.js";
import { getPagination } from "../../shared/utils/pagination.js";
import { IUpdateUserRole, IUserQuery } from "./user.interface.js";





const getAllUsers = async (query: IUserQuery) => {
  const { page, limit, search, skip } = getPagination(query);

  const where: Record<string, unknown> = {
    isDeleted: false,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
    ];
  }

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),

    prisma.user.count({
      where,
    }),
  ]);

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateUserRole = async (id:string, payload:IUpdateUserRole, requestedId:string) =>{
    if(id === requestedId){
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change your own role")
    }

const user =await prisma.user.findUnique({
    where:{id}
})
if(!user){
    throw new AppError(httpStatus.NOT_FOUND, "User not found")
}

return prisma.user.update({
    where:{id},
    data:{role:payload.role},
    select:{
        id:true,
        name:true,
        email:true,
        role:true,
    }
})

}

export const userService = { getAllUsers, updateUserRole };
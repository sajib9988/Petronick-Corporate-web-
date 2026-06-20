import httpStatus from 'http-status';
import { Request, Response } from "express"; 
import { catchAsync } from '../../shared/utils/catch-async.js';
import { sendResponse } from '../../shared/utils/send-response.js';
import { IUserQuery } from './user.interface.js';
import { userService } from './user.service.js';
import { userValidation } from './user.validation.js';



const getAllUsers = catchAsync(async(req:Request, res:Response)=>{
    const result = await userService.getAllUsers(req.query as IUserQuery)

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "Users fetched successfully",
        data: result,
    })
})

const updateUserRole = catchAsync(async(req:Request, res:Response)=>{
    const parsed = userValidation.updateUserRole.parse(req.body)
    const result = await userService.updateUserRole(req.params.id as string, parsed, req.user.id)

    sendResponse(res, {
        status: httpStatus.OK,
        success: true,
        message: "User role updated successfully",
        data: result,
    })
})

export const userController = {getAllUsers, updateUserRole}
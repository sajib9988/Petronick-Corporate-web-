import {Router} from "express"
import { userController } from "./user.controller.js"
import { authorize } from "../../shared/middlewares/authorize.middleware.js"
import { Role } from "../../../generated/prisma-client/edge.js"





const router =Router()
router.get("/", authorize(Role.SUPER_ADMIN), userController.getAllUsers)
router.patch("/:id/role", authorize(Role.SUPER_ADMIN), userController.updateUserRole)


export const userRoute = router




import {Router} from "express"
import { userController } from "./user.controller.js"
import { authorize } from "../../shared/middlewares/authorize.middleware.js"
import { Role } from "../../../generated/prisma-client/edge.js"





const router =Router()
router.get("/", authorize(Role.SUPER_ADMIN), userController.getAllUsers)
<<<<<<< HEAD
router.patch("/:id/role", authorize(Role.SUPER_ADMIN), userController.updateUserRole)


export const userRoute = router



=======
router.patch("/:id", authorize(Role.SUPER_ADMIN), userController.updateUserRole)


export const userRoute = router
>>>>>>> d46dc2ccc3be7bf13afb3608335f3d311c80b009

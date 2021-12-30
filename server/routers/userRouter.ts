import express from "express";

const router = express.Router()

import { auth } from "../middleware/auth";
import UserController from '../controllers/userController'

router.patch('/update_user', auth, UserController.updateUser)
router.patch('/reset_password', auth, UserController.resetPassword) 

export default router
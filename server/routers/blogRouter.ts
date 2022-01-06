import express from 'express'

const router = express.Router()
import blogController from "../controllers/blogController"
import { auth } from '../middleware/auth'

router.route('/blog')
    .post(auth, blogController.createBlog)

export default router;
import express from 'express'

const router = express.Router()
import blogController from "../controllers/blogController"
import { auth } from '../middleware/auth'

router.route('/blog')
    .post(auth, blogController.createBlog)

router.get('/home/blog', blogController.getHomeBlogs)
router.get('/feature/blog', blogController.getFeatureBlogs)


export default router;
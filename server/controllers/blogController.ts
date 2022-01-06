import { Request, Response } from 'express'
import Blog from '../models/blogModel'
import { UserAuthRequest } from '../config/interface'
class BlogController {
    async createBlog(req: UserAuthRequest, res: Response) {
        try {
            const { title, description, thumbnail, category, tags, content } = req.body;

            const newBlog = new Blog({
                user: req.user?._id,
                title,
                description,
                thumbnail,
                category,
                content,
                tags
            })

            await newBlog.save()

            return res.json({ msg: "Create blog success" })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default new BlogController()
import { Request, Response } from 'express'
import Blogs from '../models/blogModel'
import { UserAuthRequest } from '../config/interface'
import nonAccentVietnamese from '../config/nonAccentVietnamese';
class BlogController {
    async createBlog(req: UserAuthRequest, res: Response) {
        try {
            const { title, description, thumbnail, category, tags, content } = req.body;
            let slug = nonAccentVietnamese(title)
            const newBlog = new Blogs({
                user: req.user?._id,
                title,
                slug: `${slug.toLowerCase().trim().replace(/\s/g, '-')}-${new Date().getTime()}`,
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

    async getHomeBlogs(req: Request, res: Response) {
        try {
            const blogs = await Blogs.aggregate([
                {
                    // Join Conditions and Uncorrelated Sub-queries
                    $lookup: {
                        from: "users",
                        let: { user_id: "$user" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                            { $project: { password: 0 }, }
                        ],
                        as: "user",
                    }
                },
                {
                    $unwind: "$user",
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                { $sort: { "createdAt": -1 } },
                { $limit: 6 }
            ])

            return res.json({ blogs, length: blogs.length })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async getFeatureBlogs(Req: Request, res: Response) {
        try {
            const blogs = await Blogs.aggregate([
                {
                    // Join Conditions and Uncorrelated Sub-queries
                    $lookup: {
                        from: "users",
                        let: { user_id: "$user" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                            { $project: { password: 0 }, }
                        ],
                        as: "user",
                    }
                },
                {
                    $unwind: "$user",
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "category"
                    }
                },
                {
                    $unwind: "$category"
                },
                { $sort: { "views": 1 } },
                { $limit: 4 }
            ])

            return res.json({ blogs, length: blogs.length })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default new BlogController()
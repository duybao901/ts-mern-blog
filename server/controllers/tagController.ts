import { Request, Response } from 'express'
import Tags from '../models/tagModel'

import { UserAuthRequest } from '../config/interface'

class TagController {
    async createTag(req: UserAuthRequest, res: Response) {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." })
        if (req.user?.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication" });

        try {
            const name = req.body.name.toLowerCase();

            const tag = new Tags({
                name
            })

            const newTag = await tag.save()

            return res.status(200).json({ tag: newTag })
        } catch (err: any) {
            let errorMessage = '';
            if (err.code === 11000) {
                errorMessage = Object.values(err.keyValue)[0] + " already exits"
            } else {
                let name = Object.keys(err.errors)[0]
                errorMessage = err.errors[`${name}`].message
            }
            return res.status(500).json({ msg: errorMessage })
        }
    }

    async getTags(req: Request, res: Response) {
        try {
            const tags = await Tags.find({}).sort("-createdAt")
            return res.json({ tags })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async updateTag(req: UserAuthRequest, res: Response) {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." })
        if (req.user?.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication" });

        try {
            await Tags.findOneAndUpdate({
                _id: req.params.id
            }, { name: req.body.name })

            res.json({ msg: "Update Success." })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async deleteTag(req: UserAuthRequest, res: Response) {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." })

        if (req.user.role !== 'admin')
            return res.status(400).json({ msg: "Invalid Authentication." })

        try {
            await Tags.findByIdAndDelete(req.params.id)

            res.json({ msg: "Delete Success!" })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
export default new TagController;
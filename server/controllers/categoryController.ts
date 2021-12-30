import { Request, Response, ErrorRequestHandler } from 'express'
import Categories from '../models/categoryModel'

import { UserAuthRequest } from '../config/interface'

class CategoryController {
    async createCategory(req: UserAuthRequest, res: Response) {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." })
        if (req.user?.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication" });

        try {
            const name = req.body.name.toLowerCase();

            const category = new Categories({
                name
            })

            await category.save()

            return res.status(200).json({ msg: "Create category success." })
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

    async getCategorys(req: Request, res: Response) {
        try {
            const categorys = await Categories.find({})
            return res.json({ categorys })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async updateCategory(req: UserAuthRequest, res: Response) {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." })
        if (req.user?.role !== "admin") return res.status(400).json({ msg: "Invalid Authentication" });

        try {
            const category = await Categories.findOneAndUpdate({
                _id: req.params.id
            }, { name: req.body.name })

            res.json({ msg: "Update Success." })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async deleteCategory(req: UserAuthRequest, res: Response) {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication." })

        if (req.user.role !== 'admin')
            return res.status(400).json({ msg: "Invalid Authentication." })

        try {
            await Categories.findByIdAndDelete(req.params.id)

            res.json({ msg: "Delete Success!" })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}
export default new CategoryController;
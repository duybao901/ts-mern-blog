import { Request, Response } from 'express'
import Users from '../models/userModel'
import { UserAuth } from '../config/interface'
class UserController {
    async updateUser(req: UserAuth, res: Response) {

        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" })

        try {
            const { name, avatar } = req.body;

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                name,
                avatar
            })

            return res.status(200).json({ msg: "Update success" });

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default new UserController()
import { Request, Response } from 'express'
import Users from '../models/userModel'
import { UserAuthRequest } from '../config/interface'
import brycpt from 'bcrypt'
class UserController {
    async updateUser(req: UserAuthRequest, res: Response) {
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

    async resetPassword(req: UserAuthRequest, res: Response) {
        if (!req.user) return res.status(400).json({ msg: "Invalid Authentication" })

        if (req.user.type !== "register")
            return res.status(400).json({ msg: `Quick login with ${req.user.type} can not use this function` })

        try {
            const { password } = req.body;
            const passwordHash = await brycpt.hash(password, 12)
            await Users.findByIdAndUpdate({ _id: req.user.id }, {
                password: passwordHash
            })

            return res.json({ msg: "Update success." })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default new UserController()
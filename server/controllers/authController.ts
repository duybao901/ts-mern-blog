import { Request, Response } from 'express'
import Users from '../models/userModel'
import brcypt from 'bcrypt' // Hasd password
import { generateActiveToken } from '../config/generateToken'

// Valid
import { validEmail, validPhone } from '../middleware/valid'

// Interface
import { NewUser } from '../config/interface'

const BASE_URL = process.env.BASE_URL;

class AuthController {
    async register(req: Request, res: Response) {
        const { name, account, password }: NewUser = req.body;

        const user = await Users.findOne({ account });
        if (user) return res.status(400).json({ msg: "Email or Phone number already exists." })

        const passwordHash = await brcypt.hash(password, 12)

        const newUser: NewUser = { name, account, password: passwordHash }

        const active_token = generateActiveToken(newUser)
        const url = `${BASE_URL}/active/${active_token}`

        if (!validPhone(account) && !validEmail(account)) {
            return res.status(400).json({ msg: "Invalid phone number or email format" })
        }

        if (validEmail(account)) {
            return res.json({
                msg: "Active account!, Please check your email.",
                data: newUser,
                active_token: active_token,
            })
        } else if (validPhone(account)) {
            return res.json({
                msg: "Active account!, Please check your phone.",
                data: newUser,
                active_token: active_token,
            })
        }

    }
}

export default new AuthController
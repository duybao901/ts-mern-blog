import { Request, Response } from 'express'
import Users from '../models/userModel'
import brcypt from 'bcrypt' // Hasd password
import jwt from 'jsonwebtoken'
import { generateActiveToken } from '../config/generateToken'
import sendMail from '../config/sendMail'
import { sendSms } from '../config/sendSms'
// Valid
import { validEmail, validPhone } from '../middleware/valid'
// Interface
import { NewUser, DecodeToken } from '../config/interface'



const BASE_URL = process.env.BASE_URL;

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const { name, account, password }: NewUser = req.body;

            const user = await Users.findOne({ account });
            if (user) return res.status(400).json({ msg: "Email or Phone number already exists." })

            const passwordHash = await brcypt.hash(password, 12)

            const newUser: NewUser = { name, account, password: passwordHash }

            const active_token = generateActiveToken({ newUser })
            const url = `${BASE_URL}/active/${active_token}`

            if (!validPhone(account) && !validEmail(account)) {
                return res.status(400).json({ msg: "Invalid phone number or email format" })
            }

            if (validEmail(account)) {

                // sendMail(account, url, "Active Account", "Verify your email address");

                return res.json({
                    msg: "Active account!, Please check your email.",
                    data: newUser,
                    active_token: active_token,
                })
            } else if (validPhone(account)) {

                // sendSms("Veryfy your phone", url, account)

                return res.json({
                    msg: "Active account!, Please check your phone.",
                    data: newUser,
                    active_token: active_token,
                })
            }
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }

    }

    async activeAccount(req: Request, res: Response) {
        try {
            const { active_token } = req.body;
      
            const decode = await <DecodeToken>jwt.verify(active_token, `${process.env.ACTIVE_TOKEN}`);
       
            const { newUser } = decode
        
            if (!newUser) {
                return res.status(400).json({ msg: "Invalid authentication" })
            }

            var user = await Users.findOne({ account: newUser.account });
            if (user) return res.status(400).json({ msg: 'Account has been already.' })

            user = new Users(newUser);

            await user.save();

            return res.json({ msg: "Active account successfully!" })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

export default new AuthController
import { Request, Response, NextFunction } from 'express'
import Users from '../models/userModel'
import { DecodeToken, UserAuthRequest } from '../config/interface'
import jwt from 'jsonwebtoken'
export const auth = async (req: UserAuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(400).json({ msg: "Invalid Authentication" })

        const decode = await <DecodeToken>jwt.verify(token, `${process.env.ACCESS_TOKEN}`)
        const user = await Users.findById(decode.id)
        if (!user) return res.status(400).json({ msg: "User is not exits" })
        req.user = user;
        next()
    } catch (err: any) {
        return res.status(500).json({ msg: err.message })
    }
}
import { Request, Response } from 'express'
import Users from '../models/userModel'
import brcypt from 'bcrypt' // Hasd password
import jwt from 'jsonwebtoken'
import { generateActiveToken, generateAccessToken, generateRefreshToken } from '../config/generateToken'
import sendMail from '../config/sendMail'
import { sendSms, smsOTP, smsVerify } from '../config/sendSms'
// Valid
import { validEmail, validPhone } from '../middleware/valid'
// Interface
import { User, NewUser, DecodeToken, GooglePayload, ParamsUser } from '../config/interface'
import { OAuth2Client } from 'google-auth-library'
import axios from 'axios'
const client = new OAuth2Client(`${process.env.MAILING_CLIENT_ID}`)
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

                sendMail(account, url, "Active Account", "Verify your email address");

                return res.json({
                    msg: "Active account!, Please check your email.",
                    data: newUser,
                    active_token: active_token,
                })
            } else if (validPhone(account)) {

                sendSms("Veryfy your phone", url, account)

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
            console.log(active_token)
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

    async login(req: Request, res: Response) {
        try {
            const { account, password } = req.body;

            const user = await Users.findOne({ account });
            if (!user) return res.status(400).json({ msg: "Account is not exits." })

            loginUser(user, password, res, false);

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async logout(req: Request, res: Response) {
        try {
            res.clearCookie("refreshToken", { path: "/api/refresh_token" });
            return res.json({ msg: "Logout success." })
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async refreshToken(req: Request, res: Response) {
        try {
            const refresh_token = req.cookies.refreshToken;

            if (!refresh_token) return res.status(400).json({ msg: "Please login now!" })

            const decode = await <DecodeToken>jwt.verify(refresh_token, `${process.env.REFRESH_TOKEN}`);

            if (!decode.id) return res.status(400).json({ msg: "Please login now!" })

            const user = await Users.findById(decode.id);
            if (!user) return res.status(400).json({ msg: "This account is not exits." })

            const access_token = generateAccessToken({ id: user._id })

            return res.json({ user, access_token })

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async googleLogin(req: Request, res: Response) {
        try {

            const { id_token } = req.body;
            const verify = await client.verifyIdToken({
                idToken: id_token
            })
            const { name, email, email_verified, picture } = <GooglePayload>verify.getPayload();
            if (!email_verified)
                return res.status(400).json({ msg: "Email vefification failed." })

            const password = email + "Nnew6WPx7uMYNcT7Bwsc"
            const passwordHash = await brcypt.hash(password, 12);

            const user = await Users.findOne({ account: email })

            if (user) {
                loginUser(user, password, res, true);
            } else {
                const user = {
                    name,
                    account: email,
                    password: passwordHash,
                    avatar: picture,
                    type: 'google'
                }
                registerUser(user, res)
            }

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async facebookLogin(req: Request, res: Response) {
        try {
            const { accessToken, userID } = req.body
            const URL = `
            https://graph.facebook.com/v3.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}
          `

            const resUser = await axios.get(URL)
            const data = resUser.data

            const { name, email, picture } = data

            const password = email + "Nnew6WPx7uMYNcT7Bwsc"
            const passwordHash = await brcypt.hash(password, 12);

            const user = await Users.findOne({ account: email })

            if (user) {
                loginUser(user, password, res, true);
            } else {
                const user = {
                    name,
                    account: email,
                    password: passwordHash,
                    avatar: picture.data.url,
                    type: 'facebook'
                }
                registerUser(user, res)
            }

        } catch (err: any) {
            console.log(err.message)
            return res.status(500).json({ msg: err.message })
        }
    }

    async loginSms(req: Request, res: Response) {
        try {
            const { phone } = req.body;
            const data = await smsOTP(`${phone}`, "sms")
            return res.json(data)
        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }

    async verifySms(req: Request, res: Response) {
        try {
            const { phone, code } = req.body;
            const data = await smsVerify(phone, `${code}`);
            if (!data?.valid) return res.status(400).json({ msg: "Invalid Authentication" })

            const user = await Users.findOne({ account: phone })
            const password = phone + "Nnew6WPx7uMYNcT7Bwsc";
            const passwordHash = await brcypt.hash(password, 12);

            if (user) {
                loginUser(user, password, res, true);
            } else {
                const user = {
                    name: `${phone}`,
                    account: `${phone}`,
                    password: `${passwordHash}`,
                    type: "sms"
                }
                registerUser(user, res)
            }

        } catch (err: any) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

const loginUser = async (user: User, password: string, res: Response, ortherLogin: boolean) => {
    const isMatch = await brcypt.compare(password, user.password)

    if (!isMatch) {
        let msg = user.type !== 'register'
            ? `Password is incorrect. This account maybe login with ${user.type}` :
            ortherLogin ? "Password is incorrect. Maybe account use function register normal." : "Password is incorrect."
        return res.status(400).json({ msg })
    }

    const access_token = generateAccessToken({ id: user._id });
    const refresh_token = generateRefreshToken({ id: user._id });

    res.cookie('refreshToken', refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 100 // 30day
    })

    return res.json({
        msg: "Login success",
        access_token,
        user
    })
}

const registerUser = async (user: ParamsUser, res: Response) => {
    const newUser = new Users(user)
    await newUser.save()

    const access_token = generateAccessToken({ id: newUser._id })
    const refresh_token = generateRefreshToken({ id: newUser._id });

    res.cookie("refreshToken", refresh_token, {
        httpOnly: true,
        path: '/api/refresh_token',
        maxAge: 30 * 24 * 60 * 60 * 100 // 30day
    })

    return res.json({
        msg: "Login success",
        access_token,
        user
    })
}



export default new AuthController
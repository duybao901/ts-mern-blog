import { Document } from 'mongoose'

export interface User extends Document {
    name: string
    account: string
    password: string
    avatar: string
    role: string
    type: string
}
export interface NewUser {
    name: string
    account: string
    password: string
}

export interface DecodeToken {
    id?: string
    newUser?: NewUser
    iat: number
    exp: number
}

export interface GooglePayload {
    email: string
    email_verified: boolean
    name: string
    picture: string
}

export interface ParamsUser {
    name: string
    account: string
    password: string
    avatar: string
    type: string
}
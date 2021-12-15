import { Document } from 'mongoose'

export interface User extends Document {
    _id: string
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
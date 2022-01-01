import { ChangeEvent } from 'react'
import rootReducer from '../redux/reducers/index'

export type InputChange = ChangeEvent<HTMLInputElement>
export type FormSubmit = ChangeEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof rootReducer>

export interface Params {
    page: string
    slug: string
}

export interface UserLogin {
    account: string
    password: string
}

export interface UserRegister extends UserLogin {
    name: string | ""
    cf_password: string
}

export interface User extends UserRegister {
    avatar: string
    createdAt: string
    role: string
    type: string
    updatedAt: string
    __v: 0
    _id: string
}

export interface UserProfile extends UserRegister {
    avatar: string | File
}


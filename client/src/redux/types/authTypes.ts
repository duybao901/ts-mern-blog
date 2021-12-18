import { User } from '../../utils/TypeScript'

export const AUTH = 'AUTH'

export interface AuthPayload {
    msg?: string
    access_token?: string
    user?: User
}

export interface AuthType {
    type: typeof AUTH
    payload: AuthPayload
}
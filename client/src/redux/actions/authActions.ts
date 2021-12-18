import { Dispatch } from 'react'
import { AUTH, AuthPayload, AuthType } from '../types/authTypes'
import { UserLogin } from '../../utils/TypeScript'
import { postAPI } from '../../utils/FecthData'

export const login = (userLogin: UserLogin) => async (dispatch: Dispatch<AuthPayload | AuthType>) => {
    const { account, password } = userLogin;
    try {
        const res = await postAPI('login', { account, password });
        dispatch({
            type: AUTH,
            payload: res.data
        })
    } catch (err: any) {
        console.log(err.response.data)
    }
}
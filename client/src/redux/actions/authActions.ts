import { Dispatch } from 'react'
import { AUTH, AuthPayload, AuthType } from '../types/authTypes'
import { ALERT, AlertPayload, AlertType } from '../types/alertTypes'
import { UserLogin, UserRegister } from '../../utils/TypeScript'
import { postAPI } from '../../utils/FecthData'


export const login = (userLogin: UserLogin) => async (dispatch: Dispatch<AuthType | AlertType>) => {
    const { account, password } = userLogin;
    try {
        dispatch({ type: ALERT, payload: { loading: true } })

        const res = await postAPI('login', { account, password });
        dispatch({
            type: AUTH,
            payload: res.data
        })
        dispatch({ type: ALERT, payload: { success: "Login success." } })
        localStorage.setItem('firstLogin', "bloghub-login");
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}

export const register = (userRegister: UserRegister) => (dispatch: Dispatch<AuthType | AlertType>) => {
    
}
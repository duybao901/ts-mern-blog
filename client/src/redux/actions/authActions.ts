import { Dispatch } from 'react'
import { AUTH, AuthType } from '../types/authTypes'
import { ALERT, AlertType } from '../types/alertTypes'
import { UserLogin, UserRegister } from '../../utils/TypeScript'
import { getAPI, postAPI } from '../../utils/FecthData'
import { validRegister } from '../../utils/Valid'

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

export const register = (userRegister: UserRegister) => async (dispatch: Dispatch<AuthType | AlertType>) => {
    const errors = validRegister(userRegister)
    if (errors.length > 0) {
        dispatch({ type: ALERT, payload: { error: errors } })
        return
    }
    const { name, account, password } = userRegister;

    try {
        dispatch({ type: ALERT, payload: { loading: true } })

        const res = await postAPI('register', { name, account, password })

        dispatch({ type: ALERT, payload: { loading: false } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}

export const refreshToken = () => async (dispatch: Dispatch<AuthType | AlertType>) => {
    const firstLogin = localStorage.getItem("firstLogin")
    if (firstLogin !== "bloghub-login") return;

    try {
        dispatch({ type: ALERT, payload: { loading: true } })

        const res = await getAPI('refresh_token');

        dispatch({ type: AUTH, payload: { ...res.data } })
        dispatch({ type: ALERT, payload: { loading: false } })
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}

export const logout = () => async (dispatch: Dispatch<AuthType | AlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        localStorage.removeItem("firstLogin");

        const res = await getAPI("logout");
        dispatch({ type: AUTH, payload: {} })
        dispatch({ type: ALERT, payload: { loading: false } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })

    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}

export const googleLogin = (tokenId: string) => async (dispatch: Dispatch<AuthType | AlertType>) => {
    if (!tokenId) return
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await postAPI('login_google', { id_token: tokenId })
        dispatch({ type: AUTH, payload: res.data });
        dispatch({ type: ALERT, payload: { loading: false } })
        localStorage.setItem('firstLogin', "bloghub-login");
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}

export const facebookLogin = (accessToken: string, userID: string) => async (dispatch: Dispatch<AlertType | AuthType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await postAPI('login_facebook', { accessToken, userID })
        console.log(res)
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}
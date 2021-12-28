import { Dispatch } from 'react'
import { ALERT, AlertType, AlertPayload } from '../types/alertTypes'
import { AUTH, AuthType, AuthPayload } from '../types/authTypes'
import { checkImage, uploadImage } from '../../utils/ImageHelper'
import { patchAPI } from '../../utils/FecthData'
export const updateProfile = (file: File, name: string, auth: AuthPayload) => async (dispatch: Dispatch<AlertType | AuthType>) => {

    if (!auth.access_token || !auth.user) return;

    if (file) {
        let err = ''
        err = checkImage(file);

        if (err) {
            return dispatch({ type: "ALERT", payload: { error: err } })
        }
    }

    try {

        dispatch({ type: ALERT, payload: { loading: true } })
        let avatar;
        if (file) {
            const photo = await uploadImage(file)
            avatar = photo.url;
        }

        const res = await patchAPI('update_user', {
            name: name ? name : auth.user.name,
            avatar: avatar ? avatar : auth.user.avatar
        }, auth.access_token)

        dispatch({ type: ALERT, payload: { success: res.data.msg } })
        dispatch({
            type: AUTH, payload: {
                ...auth,
                user: {
                    ...auth.user,
                    avatar: avatar ? avatar : auth.user.avatar,
                    name: name ? name : auth.user.name,
                }
            }
        })

    } catch (err: any) {
        return dispatch({ type: "ALERT", payload: { error: err.response.data.msg } })
    }
}
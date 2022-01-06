import { Dispatch } from 'react'
import { Blog } from '../../utils/TypeScript'
import { ALERT, AlertType } from "../types/alertTypes"
import { BlogTypes } from '../types/blogTypes'
import * as Types from "../types/blogTypes"
import { postAPI } from '../../utils/FecthData'
import { uploadImage } from '../../utils/ImageHelper'

export const createBlog = (data: Blog, token: string) => async (dispatch: Dispatch<AlertType | BlogTypes>) => {
    try {

        dispatch({ type: ALERT, payload: { loading: true } })

        let photo: string;
        if (typeof data.thumbnail != "string") {
            const photoRes = await uploadImage(data.thumbnail)
            photo = photoRes.url
        } else {
            photo = data.thumbnail
        }

        const res = await postAPI('blog', { ...data, thumbnail: photo }, token)

        dispatch({ type: ALERT, payload: { loading: false } })
        dispatch({ type: ALERT, payload: { success: res.data.msg } })

    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}
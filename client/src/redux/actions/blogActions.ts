import { Dispatch } from 'react'
import { Blog } from '../../utils/TypeScript'
import { ALERT, AlertType } from "../types/alertTypes"
import { BlogTypes } from '../types/blogTypes'
import * as Types from "../types/blogTypes"
import { postAPI, getAPI } from '../../utils/FecthData'
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

export const getHomeBlogs = () => async (dispatch: Dispatch<AlertType | BlogTypes>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true } })
        const res = await getAPI('home/blog');

        dispatch({ type: Types.GET_HOME_BLOGS, payload: res.data })

        dispatch({ type: ALERT, payload: { loading: false } })
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}


export const getFeatureBlogs = () => async (dispatch: Dispatch<AlertType | BlogTypes>) => {
    try {
        dispatch({ type: Types.FEATURE_BLOG_LOADING, payload: { featureBlogLoading: true } })
        const res = await getAPI('feature/blog');

        dispatch({ type: Types.GET_FEATURE_BLOGS, payload: res.data })

        dispatch({ type: Types.FEATURE_BLOG_LOADING, payload: { featureBlogLoading: false } })

    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}
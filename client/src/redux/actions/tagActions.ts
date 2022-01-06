import { Dispatch } from 'react'
import { TagTypes } from '../types/tagTypes'
import * as Types from '../types/tagTypes'
import { ALERT, AlertType } from '../types/alertTypes'

import { getAPI, postAPI, patchAPI, deleteAPI } from '../../utils/FecthData'

export const createTag = (name: string, token: string) => async (dispatch: Dispatch<TagTypes | AlertType>) => {
    try {
        dispatch({ type: Types.LOADING_TAG, payload: { loading: true } })

        const res = await postAPI('tag', { name }, token)
        // console.log(res)
        dispatch({ type: Types.CREATE_TAG, payload: { tag: res.data.tag } })
        dispatch({ type: Types.LOADING_TAG, payload: { loading: false } })
    } catch (err: any) {
        dispatch({ type: Types.LOADING_TAG, payload: { loading: false } })
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getTags = () => async (dispatch: Dispatch<TagTypes | AlertType>) => {
    try {
        dispatch({ type: Types.LOADING_TAG, payload: { loading: true } })

        const res = await getAPI('tag')
        dispatch({
            type: Types.GET_TAGS, payload: {
                tags: res.data.tags
            }
        })
        dispatch({ type: Types.LOADING_TAG, payload: { loading: false } })
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }

}

export const updateTag = (id: string, name: string, token: string) => async (dispatch: Dispatch<TagTypes | AlertType>) => {
    if (!id || !name) return;

    try {
        dispatch({
            type: Types.UPDATE_TAG, payload: {
                _id: id,
                name
            }
        })
        await patchAPI(`tag/${id}`, { name }, token)
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}


export const deleteTag = (_id: string, token: string) => async (dispatch: Dispatch<TagTypes | AlertType>) => {
    if (!_id) {
        return
    }

    try {
        dispatch({ type: Types.DELETE_TAG, payload: { _id } })
        await deleteAPI(`tag/${_id}`, token)
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}
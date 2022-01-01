import { Dispatch } from 'react'
import { CategoryType } from '../types/categoryTypes'
import * as Types from '../types/categoryTypes'
import { ALERT, AlertType } from '../types/alertTypes'

import { getAPI, postAPI, patchAPI, deleteAPI } from '../../utils/FecthData'

export const createCategory = (name: string, token: string) => async (dispatch: Dispatch<CategoryType | AlertType>) => {
    try {
        dispatch({ type: Types.LOADING_CATEGORY, payload: { loading: true } })

        const res = await postAPI('category', { name }, token)
        // console.log(res)
        dispatch({ type: Types.CREATE_CATEGORY, payload: { category: res.data.category } })
        dispatch({ type: Types.LOADING_CATEGORY, payload: { loading: false } })
    } catch (err: any) {
        dispatch({ type: Types.LOADING_CATEGORY, payload: { loading: false } })
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}

export const getCategories = () => async (dispatch: Dispatch<CategoryType | AlertType>) => {
    try {
        dispatch({ type: Types.LOADING_CATEGORY, payload: { loading: true } })

        const res = await getAPI('category')
        dispatch({
            type: Types.GET_CATEGORIES, payload: {
                categories: res.data.categories
            }
        })
        dispatch({ type: Types.LOADING_CATEGORY, payload: { loading: false } })
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }

}

export const updateCategory = (id: string, name: string, token: string) => async (dispatch: Dispatch<CategoryType | AlertType>) => {
    if (!id || !name) return;

    try {
        dispatch({
            type: Types.UPDATE_CATEGORY, payload: {
                _id: id,
                name
            }
        })
        await patchAPI(`category/${id}`, { name }, token)
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}


export const deleteCategory = (_id: string, token: string) => async (dispatch: Dispatch<CategoryType | AlertType>) => {
    if (!_id) {
        return
    }

    try {
        dispatch({ type: Types.DELETE_CATEGORY, payload: { _id } })
        const res = await deleteAPI(`category/${_id}`, token)
    } catch (err: any) {
        return dispatch({ type: ALERT, payload: { error: err.response.data.msg } })
    }
}
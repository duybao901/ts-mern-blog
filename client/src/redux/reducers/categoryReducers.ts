import { CategoryType, CategoryPayload } from '../types/categoryTypes'
import * as Types from '../types/categoryTypes'

const categoryReducers = (state: CategoryPayload = {}, action: CategoryType): CategoryPayload => {
    switch (action.type) {
        case Types.CREATE_CATEGORY: {
            return {
                ...state,
                listCategory: state.listCategory ? [{ ...action.payload.category }, ...state.listCategory] : [{ ...action.payload.category }]
            }
        }
        case Types.GET_CATEGORIES: {
            return {
                ...state,
                listCategory: [...action.payload.categories]
            }
        }
        case Types.LOADING_CATEGORY: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        case Types.UPDATE_CATEGORY: {
            return {
                ...state,
                listCategory: state.listCategory?.map(item => {
                    return item._id === action.payload._id ? { ...item, name: action.payload.name } : item
                })
            }
        }
        case Types.DELETE_CATEGORY: {
            return {
                ...state,
                listCategory: state.listCategory?.filter(item => item._id !== action.payload._id)
            }
        }
        default:
            return state
    }
}

export default categoryReducers;
import { TagTypes, TagPayload } from '../types/tagTypes'
import * as Types from '../types/tagTypes'

const categoryReducers = (state: TagPayload = {}, action: TagTypes): TagPayload => {
    switch (action.type) {
        case Types.CREATE_TAG: {
            return {
                ...state,
                listTag: state.listTag ? [{ ...action.payload.tag }, ...state.listTag] : [{ ...action.payload.tag }]
            }
        }
        case Types.GET_TAGS: {
            return {
                ...state,
                listTag: [...action.payload.tags]
            }
        }
        case Types.LOADING_TAG: {
            return {
                ...state,
                loading: action.payload.loading
            }
        }
        case Types.UPDATE_TAG: {
            return {
                ...state,
                listTag: state.listTag?.map(item => {
                    return item._id === action.payload._id ? { ...item, name: action.payload.name } : item
                })
            }
        }
        case Types.DELETE_TAG: {
            return {
                ...state,
                listTag: state.listTag?.filter(item => item._id !== action.payload._id)
            }
        }
        default:
            return state
    }
}

export default categoryReducers;
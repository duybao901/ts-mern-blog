import { BlogPayload, BlogTypes } from '../types/blogTypes'
import * as Types from '../types/blogTypes'

const initialState: BlogPayload = {
    homeBlog: {},
    featureBlog: {},
}

const blogReducer = (state: BlogPayload = initialState, action: BlogTypes): BlogPayload => {
    switch (action.type) {
        case Types.CREATE_BLOG: {
            return {
                ...state
            }
        }
        case Types.GET_HOME_BLOGS: {
            return {
                ...state,
                homeBlog: action.payload
            }
        }
        case Types.GET_FEATURE_BLOGS: {
            return {
                ...state,
                featureBlog: action.payload
            }
        }
        case Types.FEATURE_BLOG_LOADING: {
            console.log(action.payload)
            return {
                ...state,
                featureBlog: {
                    ...state.featureBlog,
                    featureBlogLoading: action.payload.featureBlogLoading
                }
            }
        }
        default:
            return state
    }
}

export default blogReducer;
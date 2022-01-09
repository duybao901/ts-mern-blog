import { combineReducers } from 'redux'
import auth from './authReducers'
import alert from './alertReducers'
import category from './categoryReducers'
import tag from './tagReducers'
import blogs from './blogReducers'

export default combineReducers({
    alert,
    auth,
    category,
    tag,
    blogs
})

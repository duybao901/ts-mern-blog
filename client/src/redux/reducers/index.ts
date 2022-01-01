import { combineReducers } from 'redux'
import auth from './authReducers'
import alert from './alertReducers'
import category from './categoryReducers'
export default combineReducers({
    alert,
    auth,
    category
})

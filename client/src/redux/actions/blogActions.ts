import { Dispatch } from 'react'
import { Blog } from '../../utils/TypeScript'
import { ALERT, AlertType } from "../types/alertTypes"
import { BlogTypes } from '../types/blogTypes'
import * as Types from "../types/blogTypes"

export const createBlog = (data: Blog) => async (dispatch: Dispatch<AlertType | BlogTypes>) => {
    console.log(data)
}
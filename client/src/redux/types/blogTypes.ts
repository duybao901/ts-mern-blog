import { Blog } from '../../utils/TypeScript'
export const CREATE_BLOG = "CREATE_BLOG"

export interface BlogPayload {

}

export interface CreateBlog {
    type: typeof CREATE_BLOG,
    payload: {
        data: Blog
    }
}

export type BlogTypes = CreateBlog
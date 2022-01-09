import { Blog } from '../../utils/TypeScript'
export const CREATE_BLOG = "CREATE_BLOG"
export const GET_HOME_BLOGS = "GET_HOME_BLOGS"
export const GET_FEATURE_BLOGS = "GET_FEATURE_BLOGS"


export interface BlogPayload {
    homeBlog: HomeBlog
    featureBlog: FeatureBlog
}

export interface HomeBlog {
    blogs?: Blog[],
    length?: string
}

export interface FeatureBlog {
    blogs?: Blog[],
    length?: string
}
export interface CreateBlog {
    type: typeof CREATE_BLOG,
    payload: {
        data: Blog
    }
}

export interface GetHomeBlogs {
    type: typeof GET_HOME_BLOGS,
    payload: {
        blogs: Blog[]
        length?: string
    }
}

export interface GetFeatureBlogs {
    type: typeof GET_FEATURE_BLOGS,
    payload: {
        blogs: Blog[]
        length?: string
    }
}

export type BlogTypes = CreateBlog | GetHomeBlogs | GetFeatureBlogs
import { Blog } from '../../utils/TypeScript'
export const CREATE_BLOG = "CREATE_BLOG"
export const GET_HOME_BLOGS = "GET_HOME_BLOGS"
export const GET_FEATURE_BLOGS = "GET_FEATURE_BLOGS"
export const FEATURE_BLOG_LOADING = "FEATURE_BLOG_LOADING"

export interface BlogPayload {
    homeBlog: HomeBlog
    featureBlog: FeatureBlog
}

export interface HomeBlog {
    blogs?: Blog[],
    length?: string,
    homeBlogLoading?: Boolean
}

export interface FeatureBlog {
    blogs?: Blog[],
    length?: string
    featureBlogLoading?: Boolean
}

export interface CreateBlog {
    type: typeof CREATE_BLOG,
    payload: {
        data: Blog
    }
}

export interface GetHomeBlogs {
    type: typeof GET_HOME_BLOGS,
    payload: HomeBlog
}

export interface GetFeatureBlogs {
    type: typeof GET_FEATURE_BLOGS,
    payload: FeatureBlog
}

export interface FeatureBlogLoading {
    type: typeof FEATURE_BLOG_LOADING,
    payload: FeatureBlog
}
export type BlogTypes = CreateBlog | GetHomeBlogs | GetFeatureBlogs | FeatureBlogLoading
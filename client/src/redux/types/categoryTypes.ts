export const CREATE_CATEGORY = "CREATE_CATEGOR"
export const GET_CATEGORIES = "GET_CATEGORIES"
export const LOADING_CATEGORY = "LOADING_CATEGOR"
export const UPDATE_CATEGORY = "UPDATE_CATEGORY"
export const DELETE_CATEGORY = "DELETE_CATEGORY"

export interface Category {
    createdAt: string
    name: string
    updatedAt: string
    _id: string
}

export interface CategoryPayload {
    listCategory?: Category[],
    loading?: boolean
}

export interface LoadingCategory {
    type: typeof LOADING_CATEGORY
    payload: {
        loading: boolean
    }
}

export interface CreateCategory {
    type: typeof CREATE_CATEGORY
    payload: {
        category: Category
    }
}

export interface GetCategories {
    type: typeof GET_CATEGORIES
    payload: {
        categories: Category[]
    }
}

export interface UpdateCategory {
    type: typeof UPDATE_CATEGORY,
    payload: {
        _id: string
        name: string
    }
}

export interface DeleteCategory {
    type: typeof DELETE_CATEGORY
    payload: {
        _id: string
    }
}

export type CategoryType = CreateCategory | GetCategories | LoadingCategory | UpdateCategory | DeleteCategory

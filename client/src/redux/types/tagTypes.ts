export const CREATE_TAG = "CREATE_TAG"
export const GET_TAGS = "GET_TAGS"
export const LOADING_TAG = "LOADING_TAG"
export const UPDATE_TAG = "UPDATE_TAG"
export const DELETE_TAG = "DELETE_TAG"

export interface Tag {
    createdAt: string
    name: string
    updatedAt: string
    _id: string
}

export interface TagPayload {
    listTag?: Tag[],
    loading?: boolean
}

export interface LoadingTag {
    type: typeof LOADING_TAG
    payload: {
        loading: boolean
    }
}

export interface CreateTag {
    type: typeof CREATE_TAG
    payload: {
        tag: Tag
    }
}

export interface GetTags {
    type: typeof GET_TAGS
    payload: {
        tags: Tag[]
    }
}

export interface UpdateTag {
    type: typeof UPDATE_TAG,
    payload: {
        _id: string
        name: string
    }
}

export interface DeleteTag {
    type: typeof DELETE_TAG
    payload: {
        _id: string
    }
}

export type TagTypes = CreateTag | GetTags | LoadingTag| UpdateTag | DeleteTag

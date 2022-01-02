import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RootStore, Blog } from '../utils/TypeScript'
import CardPreview from '../components/card/CardPreview'
import CreateBlogForm from '../components/card/CreateBlogForm'
const CreateBlog = () => {


    const { auth, category: cate } = useSelector((state: RootStore) => state)

    const initalState = {
        user: "",
        title: "",
        content: "",
        description: "",
        thumbnail: "",
        category: [],
        createdAt: new Date().toDateString()
    }

    const [blog, setBlog] = useState<Blog>(initalState)


    return (
        <div className='create-blog'>
            <div className="container">
                <h2 className="heading">Create Category</h2>
                <div className='indicator'></div>
                <div className='create-blog__body'>
                    <div className="create-blog__body-left">
                        <CreateBlogForm blog={blog} setBlog={setBlog} />
                    </div>
                    <div className="create-blog__body-right">
                        <CardPreview />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateBlog

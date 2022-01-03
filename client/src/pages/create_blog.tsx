import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RootStore, Blog } from '../utils/TypeScript'
import CardPreview from '../components/card/CardPreview'
import CreateBlogForm from '../components/card/CreateBlogForm'
import Quill from '../components/editor/ReactQuill'
const CreateBlog = () => {


    const { auth, category: cate } = useSelector((state: RootStore) => state)

    const initalState = {
        user: "",
        title: "Title ...",
        content: "",
        description: "Description...",
        thumbnail: "https://res.cloudinary.com/dxnfxl89q/image/upload/v1641224999/bloghub-dev/preview_xwyxap.jpg",
        category: ["Category1","Category2","..."],
        createdAt: new Date().toDateString()
    }

    const [blog, setBlog] = useState<Blog>(initalState)
    const [body, setBody] = useState('')


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
                        <CardPreview blog={blog} />
                    </div>
                </div>
                <div style={{ margin: "50px 0px" }} className='indicator'></div>
                <div>
                    <p style={{ marginBottom: '10px', fontSize: "15px" }}>Body</p>
                    <Quill setBody={setBody} />
                </div>
                <button className='btn-primary' style={{ marginTop: "20px", width: "100%" }} type='submit'>Create Blog</button>
            </div>
        </div>
    )
}

export default CreateBlog

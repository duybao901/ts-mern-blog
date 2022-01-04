import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RootStore, Blog } from '../utils/TypeScript'
import CardPreview from '../components/card/CardPreview'
import CreateBlogForm from '../components/card/CreateBlogForm'
import Quill from '../components/editor/ReactQuill'
import NotFound from '../components/global/NotFound'
import { validBlog } from '../utils/Valid'
import { ALERT } from '../redux/types/alertTypes'
import { createBlog } from '../redux/actions/blogActions'

const CreateBlog = () => {

    const dispatch = useDispatch()
    const { auth, category: cate, alert } = useSelector((state: RootStore) => state)

    const initalState = {
        user: "",
        title: "Title ...",
        content: "",
        description: "Description...",
        thumbnail: "https://res.cloudinary.com/dxnfxl89q/image/upload/v1641273965/bloghub-dev/preview_y5npqa.jpg",
        category: [],
        createdAt: new Date().toDateString()
    }

    const [blog, setBlog] = useState<Blog>(initalState)
    const [body, setBody] = useState('')
    const [text, setText] = useState("");

    const divRef = useRef<HTMLDivElement>(null)


    useEffect(() => {
        const div = divRef.current;
        if (!div) return

        const text = div.innerText as string;
        setText(text)
    }, [body])

    const handleSubmit = () => {

        if (!auth.access_token) return;

        const check = validBlog({ ...blog, content: body });

        if (check.errorsLength !== 0) {
            return dispatch({ type: ALERT, payload: { error: check.errors } })
        }
        dispatch(createBlog({ ...blog, content: body }))
    }

    if (!auth.access_token) {
        if (!alert.loading) {
            return <NotFound />
        }
    }

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
                    <p style={{ marginBottom: '10px', fontSize: "15px" }}>Content</p>

                    <Quill setBody={setBody} />

                    {/*
                        dangerouslySetInnerHTML tương đương với innerHTML trong DOM. 
                        Nhìn chung, việc thay đổi DOM từ Javascript khá rủi ro do nó có thể vô tình để lộ người dùng cross-site scripting (XSS). Vì vậy, React có thể tạo HTML trực tiếp, nhưng bạn phải sử dụng dangerouslySetInnerHTML 
                        và truyền một object với key là _html để nhăc bạn nhớ rằng điều này không an toàn 
                    */}
                    <div ref={divRef}
                        dangerouslySetInnerHTML={{ __html: body }}
                        style={{ display: "none" }}
                    ></div>

                    <span style={{ fontSize: "14px", marginTop: "5px", display: "block" }}>{text.length}/2000</span>

                </div>
                <button onClick={handleSubmit} className='btn-primary' style={{ marginTop: "20px", width: "100%" }}>Create Blog</button>
            </div>
        </div >
    )

}

export default CreateBlog

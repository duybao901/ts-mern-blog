import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootStore, Blog, FormSubmit, InputChange } from '../../utils/TypeScript'

interface CreateBlogFormProps {
    blog: Blog
    setBlog: (blog: Blog) => void
}


const CreateBlogForm: React.FC<CreateBlogFormProps> = ({ blog, setBlog }) => {

    const { category } = useSelector((state: RootStore) => state)
    const { title, description } = blog;
    const [checkedCate, setCheckedCate] = useState<string[]>([])

    const onHandleChangeInput = (e: InputChange) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setBlog({
            ...blog,
            [name]: value
        })
    }
    const onHandleChangeCate = (e: InputChange, id: string) => {

        category.listCategoryName?.forEach(() => {
            if (checkedCate.includes(id)) {
                const index = checkedCate.indexOf(id);
                if (index > -1) {
                    checkedCate.splice(index, 1);
                }
            }
            else {
                checkedCate.push(id)
            }
        })
        let array: string[] = [];
        category.listCategoryName?.forEach(item => {
            checkedCate.forEach(id => {
                if (item._id === id) {
                    array.push(item.name)
                }
            })
        })

        setBlog({
            ...blog,
            category: array
        })
    }

    const onHandleFileChange = (e: InputChange) => {
        const target = e.target as HTMLInputElement
        const files = target.files;

        if (files) {
            const file = files[0];
            setBlog({
                ...blog,
                thumbnail: file
            })
        }


    }

    const onSubmit = (e: FormSubmit) => {
        e.preventDefault()
        console.log(blog)
    }

    return (
        <div className="card-form">
            <h2>Create</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <div className='input-wrap'>
                        <input onChange={onHandleChangeInput} type="text" name='title' value={title} id='title' />
                        <small>
                            {title.length}/50
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="file-up">Thumbnail</label>
                    <input onChange={onHandleFileChange} type="file" accept='image/*' name='title' id='file-up' />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <div className='input-wrap'>
                        <textarea rows={8} onChange={onHandleChangeInput} name='description' value={description} id='description' />
                        <small>
                            {description.length}/500
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Chosse Categories</label>
                    <div>
                        {
                            category.listCategoryName?.map((item, index) => {
                                return <div className="cate-checkbox" key={index}>
                                    <input
                                        onChange={(e) => onHandleChangeCate(e, item._id)}
                                        type="checkbox"
                                        key={item.name}
                                        name={item.name}
                                        id={item.name}
                                    />
                                    <label htmlFor={item.name}>{item.name}</label>
                                </div>
                            })
                        }
                    </div>
                </div>
                <button className='btn-primary' type='submit'>Create</button>
            </form >
        </div >
    )
}

export default CreateBlogForm

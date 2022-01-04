import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootStore, Blog, FormSubmit, InputChange } from '../../utils/TypeScript'

interface CreateBlogFormProps {
    blog: Blog
    setBlog: (blog: Blog) => void
}

const CreateBlogForm: React.FC<CreateBlogFormProps> = ({ blog, setBlog }) => {

    const { category } = useSelector((state: RootStore) => state)
    const { title, description } = blog;
    const [checkedCate, setCheckedCate] = useState<boolean[]>([])

    useEffect(() => {
        if (category.listCategoryName) {
            setCheckedCate(new Array(category.listCategoryName?.length).fill(false))
        }
    }, [category.listCategoryName])

    const onHandleChangeInput = (e: InputChange) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setBlog({
            ...blog,
            [name]: value
        })
    }

    const onHandleChangeCate = (e: InputChange, position: number) => {

        const updatedCheckedState = checkedCate.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedCate(updatedCheckedState)
        let cateCheckState: any[] = []
        category.listCategoryName?.forEach((cate, cateIndex) => {
            updatedCheckedState.map((item, index) => {
                if (item) {
                    if (cateIndex === index) {
                        cateCheckState.push(cate.name)
                    }
                }
            })
        })

        setBlog({
            ...blog,
            category: cateCheckState
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
                            {description.length}/200
                        </small>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Chosse Categories</label>
                    <div className='cate-checkbox-wrap'>
                        {
                            category.listCategoryName?.map((item, index) => {
                                return <div className="cate-checkbox-item" key={index}>
                                    <input                                     
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={item.name}
                                        value={item.name}
                                        checked={checkedCate[index] ? checkedCate[index] : false}
                                        onChange={(e) => onHandleChangeCate(e, index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{item.name}</label>
                                </div>
                            })
                        }
                    </div>
                </div>
            </form >
        </div >
    )
}

export default CreateBlogForm

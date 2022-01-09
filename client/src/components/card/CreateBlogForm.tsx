import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore, Blog, FormSubmit, InputChange } from '../../utils/TypeScript'
import { ALERT } from '../../redux/types/alertTypes'
interface CreateBlogFormProps {
    blog: Blog
    setBlog: (blog: Blog) => void
}

const CreateBlogForm: React.FC<CreateBlogFormProps> = ({ blog, setBlog }) => {

    const disptach = useDispatch()
    const { category, tag } = useSelector((state: RootStore) => state)
    const { title, description } = blog;
    const [checkedTag, setCheckedTag] = useState<boolean[]>([])
    const [tagName, setTagName] = useState<string>('')
    const [tagNameArray, setTagNameArray] = useState<any[]>([])
    const [msgErrorTagName, setMsgErrorTagName] = useState<string>("")
    const [toggleTagInput, setToggleTagInput] = useState<boolean>(false)

    // Init state checked tag : false, flase, false,...
    useEffect(() => {
        if (tag.listTag) {
            setCheckedTag(new Array(tag.listTag?.length).fill(false))
        }
    }, [tag.listTag])

    // OnChange title, description ...
    const onHandleChangeInput = (e: InputChange) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setBlog({
            ...blog,
            [name]: value
        })
    }

    // Handle check tag
    const onHandleChangeTag = (e: InputChange, position: number) => {

        if (blog.tags.length >= 5) {
            return disptach({ type: ALERT, payload: { error: "Maximum is 5 tag" } })
        }

        const updatedCheckedState = checkedTag.map((item, index) =>
            index === position ? !item : item
        );

        // [false, flase, true, true]
        setCheckedTag(updatedCheckedState)
        tag.listTag?.forEach((tag, cateIndex) => {
            updatedCheckedState.map((item, index) => {
                if (item) {
                    if (cateIndex === index) {
                        if (!blog.tags.includes(tag.name)) {
                            blog.tags.push(tag.name)
                        }
                    }
                } else {
                    if (cateIndex === index) {
                        if (blog.tags.includes(tag.name)) {
                            const index = blog.tags.indexOf(tag.name);
                            if (index > -1) {
                                blog.tags.splice(index, 1);
                            }
                        }
                    }
                }
            })
        })

        setBlog({
            ...blog
        })
    }

    // OnChange set tag name
    const handleChangeYourTag = (e: any) => {
        setMsgErrorTagName("")
        setTagName(e.target.value)
    }

    // Enter and add your tag
    const handleAddYourTag = (e: any) => {

        let flag = false;

        if (e.key === 'Enter' && tagName !== '') {
            if (blog.tags.length >= 5) {
                return disptach({ type: ALERT, payload: { error: "Maximum is 5 tag" } })
            }

            tag.listTag?.forEach((item) => {
                if (item.name === e.target.value.toLowerCase()) {
                    setMsgErrorTagName(`${e.target.value} is exist in example tag`)
                    flag = true
                }
            })


            if (blog.tags.includes(e.target.value.toLowerCase())) {
                setMsgErrorTagName(`${e.target.value} is exist`)
            } else if (!flag) {
                setTagName('')
                tagNameArray.push(e.target.value)
                setTagNameArray(tagNameArray)
                blog.tags.push(e.target.value)
                setBlog({ ...blog })
            }

        }
    }

    // Handle delete your tag
    const handleDeleteYourTag = (item: string) => {

        setTagNameArray(tagNameArray.filter(e => e !== item))

        setBlog({
            ...blog,
            tags: blog.tags.filter(e => e !== item)
        })
    }

    // Change Thumnail
    const onHandleFileChange = (e: InputChange) => {
        const target = e.target as HTMLInputElement
        const files = target.files;

        if (files) {
            const file = files[0];
            if (file) {
                setBlog({
                    ...blog,
                    thumbnail: file
                })
            }
        }
    }

    return (
        <div className="card-form">
            <h2>Create</h2>
            <form>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <div className='input-wrap'>
                        <input onChange={onHandleChangeInput} type="text" name='title' value={title} id='title' />
                        <small>
                            {title.length}/100
                        </small>
                    </div>
                </div>

                {/* Thumbnail */}
                <div className="form-group">
                    <label htmlFor="file-up">Thumbnail</label>
                    <input onChange={onHandleFileChange} type="file" accept='image/*' name='title' id='file-up' />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <div className='input-wrap'>
                        <textarea rows={8} onChange={onHandleChangeInput} name='description' value={description} id='description' />
                        <small>
                            {description.length}/300
                        </small>
                    </div>
                </div>

                {/* Category */}
                <div className="form-group">
                    <select name='category' value={blog.category} onChange={onHandleChangeInput}>
                        <option value="">Chose a category</option>
                        {
                            category.listCategory?.map((item) => {
                                return <option value={item._id} key={item._id}>{item.name}</option>
                            })
                        }
                    </select>
                </div>

                {/* Tags */}
                <div className="form-group">
                    <label htmlFor="tags">Chosse Tags (Maximum 5 tags) </label>
                    <div className='cate-checkbox-wrap'>
                        {
                            tag.listTag?.map((item, index) => {
                                return <div className="cate-checkbox-item" key={index}>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        name={item.name}
                                        value={item.name}
                                        checked={checkedTag[index] ? checkedTag[index] : false}
                                        onChange={(e) => onHandleChangeTag(e, index)}
                                    />
                                    <label htmlFor={`custom-checkbox-${index}`}>{item.name}</label>
                                </div>
                            })
                        }
                    </div>
                </div>

                <div className="form-group" >
                    <label onClick={() => setToggleTagInput(!toggleTagInput)} className="label-btn" htmlFor="tags">Or Add Your tag <i className='bx bx-purchase-tag-alt'></i></label>
                    {
                        toggleTagInput && <div className="your-tag">
                            <input type="text" placeholder='Example: Html, Css, Javascript ...' value={tagName} onKeyPress={handleAddYourTag} onChange={handleChangeYourTag} />
                            <ul>
                                {

                                    tagNameArray.map((item, index) => {
                                        return <li key={index} className="your-tag-item">
                                            {item}
                                            <i className='bx bx-x' onClick={() => handleDeleteYourTag(item)}></i>
                                            <i className='bx bx-purchase-tag' ></i>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    }
                    {
                        msgErrorTagName && <small style={{ fontSize: "14px", marginTop: "10px", color: "crimson" }}>{msgErrorTagName}</small>
                    }
                </div>

            </form >
        </div >
    )
}

export default CreateBlogForm

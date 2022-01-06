import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormSubmit, InputChange, RootStore } from '../utils/TypeScript'
import { Tag } from '../redux/types/tagTypes'
import NotFound from '../components/global/NotFound'
import { createTag, updateTag, deleteTag } from '../redux/actions/tagActions'
const CreateTag = () => {

    const dispatch = useDispatch()
    const { auth, tag, alert } = useSelector((state: RootStore) => state)
    const [name, setName] = useState('')
    const [onEdit, setOnEdit] = useState<Tag | null>(null)


    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        if (!auth.access_token || !name) return
        if (onEdit) {
            if (onEdit.name !== name) {
                dispatch(updateTag(onEdit._id, name, auth.access_token))
            }
        } else {
            dispatch(createTag(name, auth.access_token))
        }

        setOnEdit(null)
        setName('')
    }


    useEffect(() => {
        if (onEdit) {
            setName(onEdit.name)
        }
    }, [onEdit])

    const handleDeleteCategory = (_id: string) => {
        if (!_id || !auth.access_token) return;
        dispatch(deleteTag(_id, auth.access_token))
    }



    if (!auth.access_token && auth.user?.role === 'admin') {
        if (!alert.loading) {
            return <NotFound />
        }
    }

    return (
        <div className="category">
            <div className="container">
                <h2 className="category__header heading">Create Tag</h2>
                <div className='indicator'></div>
                <div className="category__body">
                    <form action="" onSubmit={onHandleSubmit}>
                        <div className="form__group">
                            <input
                                type="text" id="name" placeholder='Enter the name tag...'
                                value={name}
                                onChange={(e: InputChange) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <button disabled={(name || onEdit) ? false : true} type='submit' className={(name || onEdit) ? 'btn-primary' : 'btn-primary btn-primary--ds'}>{onEdit ? "Update" : "Create"}</button>
                            {
                                onEdit && <button style={{ marginTop: "10px" }} onClick={() => { setOnEdit(null); setName('') }} className='btn-primary btn-primary--danger'>Cancel</button>
                            }
                        </div>
                    </form>
                    <ul className="category__list">
                        {
                            (!alert.loading && tag.loading) && <p className="loading_cate">Creating...</p>
                        }
                        {
                            tag.listTag?.map((item, index) => {
                                return <li key={index} className={onEdit?._id === item._id ? "category__list-item category__list-item--edit" : "category__list-item"}>
                                    <p className='item__name'>
                                        {item.name}
                                    </p>
                                    <div className='item__control'>
                                        <i className='bx bx-pencil' onClick={() => setOnEdit(item)}></i>
                                        <i className='bx bx-trash-alt' onClick={() => handleDeleteCategory(item._id)}></i>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CreateTag

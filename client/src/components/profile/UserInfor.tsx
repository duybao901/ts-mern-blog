import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootStore, UserProfile, FormSubmit, InputChange } from '../../utils/TypeScript'
const UserInfor = () => {
    const initState = {
        name: '', account: '', avatar: '', password: '', cf_password: ''
    }
    const { auth } = useSelector((state: RootStore) => state)
    const [user, setUser] = useState<UserProfile>(initState);
    const [typePassword, setTypePassword] = useState(false);
    const [typeCfPassword, setTypeCfPassword] = useState(false);

    const { name, account, avatar, password, cf_password } = user

    const onHandlechange = (e: InputChange) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
    }

    const onHandleChangeFile = (e: InputChange) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;

        if (files) {
            const file = files[0];
            setUser({
                ...user,
                avatar: file
            })
        }
    }

    return (
        <>
            <div className="user__infor-avatar">
                <img src={avatar ? URL.createObjectURL(avatar as Blob) : auth.user?.avatar} alt='avatar' />
                <span>
                    <i className='bx bx-upload'></i>
                    <p>Upload</p>
                    <input onChange={onHandleChangeFile} type="file" id="file-up" accept='image/*' name='file-up' />
                </span>
            </div>

            <div className="user__infor-detail">
                <form onSubmit={onHandleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="name">Name</label>
                        <input placeholder='abc@gmail.com' type="text" name='name' id='name' value={name} onChange={onHandlechange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="account">Email or Phone</label>
                        <input placeholder='abc@gmail.com' type="text" name='account' id='account' value={account} onChange={onHandlechange} />
                    </div>

                    <div className='form-group'>
                        <label htmlFor="password">Password</label>
                        <div className="form-group-pw">
                            <input placeholder='Password must be at least 6 chars.' type={typePassword ? "password" : 'text'} name='password' id='password' value={password} onChange={onHandlechange} />
                            <span onClick={() => setTypePassword(!typePassword)}>{password ? typePassword ? 'show' : 'hide' : ''}</span>
                        </div>
                    </div>

                    <div className='form-group '>
                        <label htmlFor="cf_passowd">Confirm Password</label>
                        <div className="form-group-pw">
                            <input placeholder='Password must be at least 6 chars.' type={typeCfPassword ? "password" : 'text'} name='cf_password' id='cf_password' value={cf_password} onChange={onHandlechange} />
                            <span onClick={() => setTypeCfPassword(!typeCfPassword)}>{cf_password ? typeCfPassword ? 'show' : 'hide' : ''}</span>
                        </div>
                    </div>
                    <button
                        className={(name && password && account && cf_password) ? 'btn-primary' : "btn-primary  btn-primary--ds"}
                        disabled={(name && password && account && cf_password) ? false : true}>Register</button>
                </form >
            </div >
        </>
    )
}

export default UserInfor

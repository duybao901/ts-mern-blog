import React, { useState } from 'react'
import { InputChange, FormSubmit } from '../../utils/TypeScript'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/actions/authActions'

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [userRegister, setUserRegister] = useState({ name: "", account: '', password: '', cf_password: "" })
    const [typePassword, setTypePassword] = useState(true)
    const [typeCfPassword, setTypeCfPassword] = useState(true)
    const { name, account, password, cf_password } = userRegister;

    const onHandlechange = (e: InputChange) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setUserRegister({
            ...userRegister,
            [name]: value
        })
    }

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(register(userRegister))
    }

    return (
        <form onSubmit={onHandleSubmit}>
            <div className='form-group'>
                <label htmlFor="name">Name</label>
                <input placeholder='abc@gmail.com' type="text" name='name' id='name' value={name} onChange={onHandlechange} />
            </div>
            <div className='form-group'>
                <label htmlFor="account">Email or Phone</label>
                <input placeholder='abc@gmail.com' type="text" name='account' id='account' value={account} onChange={onHandlechange} />
            </div>

            <div className='form-group '>
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
    )
}

export default RegisterForm

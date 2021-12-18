import React, { useState } from 'react'
import { InputChange, FormSubmit } from '../../utils/TypeScript'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/actions/authActions'
const LoginPass = () => {
    const dispatch = useDispatch()
    const [userLogin, setUserLogin] = useState({ account: '', password: '' })
    const [typePassword, setTypePassword] = useState(true)
    const { account, password } = userLogin;

    const onHandlechange = (e: InputChange) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        setUserLogin({
            ...userLogin,
            [name]: value
        })
    }

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(login(userLogin))
    }

    return (
        <form onSubmit={onHandleSubmit}>
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
            <button
                className={(password && account) ? 'btn-primary' : "btn-primary  btn-primary--ds"}
                disabled={(password && account) ? false : true}>Login</button>
        </form >
    )
}

export default LoginPass

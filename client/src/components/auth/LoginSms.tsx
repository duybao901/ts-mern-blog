import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { FormSubmit } from '../../utils/TypeScript'
import { loginSMS } from '../../redux/actions/authActions'
const LoginSms = () => {
    
    const dispatch = useDispatch()
    const [phone, setPhone] = useState('')

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(loginSMS(phone))
    }

    return (
        <form onSubmit={onHandleSubmit}>
            <div className='form-group'>
                <label htmlFor="phone">Phone</label>
                <input placeholder='+84327139348' type="text" name='account' id='account' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <button
                className={phone ? 'btn-primary' : "btn-primary  btn-primary--ds"}
                disabled={phone ? false : true}>Login</button>
        </form >
    )
}

export default LoginSms

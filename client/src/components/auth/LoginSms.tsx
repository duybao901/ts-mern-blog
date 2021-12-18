import React, { useState } from 'react'

import { FormSubmit } from '../../utils/TypeScript'
const LoginSms = () => {
    const [phone, setPhone] = useState('')

    const onHandleSubmit = (e: FormSubmit) => {
        e.preventDefault()

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

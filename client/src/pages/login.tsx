import React, { useState } from 'react'
import LoginPass from '../components/auth/LoginPass'
import LoginSms from '../components/auth/LoginSms'
import { Link } from 'react-router-dom'
const Login = () => {

    const [signSms, setSignSms] = useState(false)

    return (
        <div className='auth-page mr-top-header'>
            <div className='auth-page__body'>
                <h2 className='auth-page__header'>Login</h2>
                <div style={{ textAlign: 'center', marginBottom: "30px", fontSize: "15px" }}>
                    <p>You don't have account? <Link style={{ color: "crimson" }} to='/register'>register now</Link></p>
                </div>
                {!signSms ? <LoginPass /> : <LoginSms />}
                <div className="auth-page__forgot">
                    <Link to='/forgot'>For got password?</Link>
                    <span onClick={() => setSignSms(!signSms)}>{!signSms ? "Sign in with SMS" : "Sign in with Password"}</span>
                </div>
            </div>
        </div >
    )
}

export default Login

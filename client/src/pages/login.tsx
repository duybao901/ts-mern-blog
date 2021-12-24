import React, { useState, useEffect } from 'react'
import LoginPass from '../components/auth/LoginPass'
import LoginSms from '../components/auth/LoginSms'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootStore } from '../utils/TypeScript'
import { useHistory } from 'react-router-dom'
import SocialLogin from '../components/auth/SocialLogin'
const Login = () => {
    const history = useHistory()
    const { auth } = useSelector((state: RootStore) => state)
    const [signSms, setSignSms] = useState(false)
    useEffect(() => {
        if (auth.access_token) {
            history.push('/')
        }
    }, [auth.access_token])
    return (
        <div className='auth-page'>
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
                <div className='auth-page__indicator'>
                    <p>or</p>
                </div>
                <SocialLogin></SocialLogin>
            </div>
        </div >
    )
}

export default Login

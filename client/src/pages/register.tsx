import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import RegisterForm from '../components/auth/RegisterForm'
import { RootStore } from '../utils/TypeScript'
const Register = () => {
    const history = useHistory()
    const { auth } = useSelector((state: RootStore) => state)
    useEffect(() => {
        if (auth.access_token) {
            history.push('/')
        }
    }, [auth.access_token])
    return (
        <div className='auth-page'>
            <div className='auth-page__body'>
                <h2 className='auth-page__header'>Register</h2>
                <div style={{ textAlign: 'center', marginBottom: "30px", fontSize: "15px" }}>
                    <p>Are you have account? <Link style={{ color: "crimson" }} to='/login'>login now</Link></p>
                </div>
                <RegisterForm />
            </div>
        </div >
    )
}

export default Register

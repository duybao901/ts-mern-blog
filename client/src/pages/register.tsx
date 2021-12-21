import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'
const Register = () => {
    return (
        <div className='auth-page mr-top-header' style={{marginTop:'0px'}}>
            <div className='auth-page__body'>
                <h2 className='auth-page__header'>Register</h2>
                <div style={{ textAlign: 'center', marginBottom: "30px", fontSize: "15px" }}>
                    <p>Are you have account? <Link style={{ color: "crimson" }} to='/register'>login now</Link></p>
                </div>
                <RegisterForm />
            </div>
        </div >
    )
}

export default Register

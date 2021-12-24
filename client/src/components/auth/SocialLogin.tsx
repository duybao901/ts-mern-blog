import React from 'react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import FacebookLogin, { ReactFacebookLoginProps } from 'react-facebook-login';
import { googleLogin } from '../../redux/actions/authActions'
import { useDispatch } from 'react-redux'
const SocialLogin = () => {

    const dispatch = useDispatch();
    function handleLoginSuccess(response: GoogleLoginResponse | GoogleLoginResponseOffline) {
        if ("profileObj" in response) {     // Copy 
            const { id_token } = response.getAuthResponse()
            dispatch(googleLogin(id_token))
        }
    }

    const responseFacebook = (response: ReactFacebookLoginProps | any) => {

    }

    const onFailure = (error: any) => {
        console.log(error);
    }

    return (
        <div className='social-login'>
            <GoogleLogin
                clientId="149279964275-13t907vaqrkdeh7ft9emb0d2cq93896l.apps.googleusercontent.com"
                buttonText="Login with Google"
                onSuccess={handleLoginSuccess}
                onFailure={handleLoginSuccess}
                className='google-button'
                responseType='code,token'
            />
            <FacebookLogin
                appId="1088597931155576"
                autoLoad={true}
                // cssClass="facebook-button"
                fields="name,email,picture"
                callback={responseFacebook}             
                onFailure={onFailure} />

        </div>
    )
}

export default SocialLogin

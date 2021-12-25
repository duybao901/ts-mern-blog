import React from 'react'
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import FacebookLogin, { ReactFacebookLoginProps } from 'react-facebook-login';
import { googleLogin, facebookLogin } from '../../redux/actions/authActions'
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
        const { accessToken, userID } = response;
        dispatch(facebookLogin(accessToken, userID))
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
                appId="5505892809427254"
                // cssClass="facebook-button"
                fields="name,email,picture"
                callback={responseFacebook}
                onFailure={onFailure}
                icon="fa-facebook"
            />

        </div>
    )
}

export default SocialLogin

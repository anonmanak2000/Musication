import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { ChangeEvent, MutableRefObject } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import jwtDecode from 'jwt-decode'

function GoogleSSO(): JSX.Element {

    const navigate: NavigateFunction = useNavigate()


    const successLogin = (credentialResponse: CredentialResponse): void => {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const responsePayload: any = jwtDecode(credentialResponse.credential!)

        console.log(responsePayload)

        navigate('/main')
    }

    const failedLogin = (): void => {
        console.log('Login Failed');
    }

    return (
        <GoogleLogin
            onSuccess={successLogin}
            onError={failedLogin}
            type='standard'
            theme='outline'
            size='large'
            text='signin_with'
            shape='rectangular'
            logo_alignment='left'
            useOneTap
            cancel_on_tap_outside
            ux_mode='popup'
            context='signin'
        />
    )

}

function EmailRegistration(): JSX.Element {

    const emailRef: MutableRefObject<HTMLInputElement> = useRef() as MutableRefObject<HTMLInputElement>;

    const [isDisabled, setIsDisabled] = useState(true)

    const navigate: NavigateFunction = useNavigate()

    const googleAPIKey = '441082685734-6f52d39balct2n5tc47kk17ro4bu35kk.apps.googleusercontent.com'

    const checkEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()

        const currentEmail: string = event.target.value

        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i;

        const result: boolean = expression.test(currentEmail);

        result ? setIsDisabled(false) : setIsDisabled(true)

    }


    const gotoVerifyEmail = (): void => {
        const currentEmail: string = emailRef.current.value
        navigate('/register?state=verifyEmail', { state: { userEmail: currentEmail } })
    }

    return (

        <>
            <div className="Registration_Component_Title">
                <h2>Hello Musicophile! Let's set up your free account.</h2>
            </div>

            <div className="Registration_Component_Input">

                <div className='GoogleSSO'>
                    <GoogleOAuthProvider clientId={googleAPIKey}>
                        <GoogleSSO />
                    </GoogleOAuthProvider>
                </div>

                <div className="Separator">
                    <div className="divider"></div>
                    <div className="Separator_text">
                        Or
                    </div>
                    <div className="divider"></div>
                </div>

                <div className='Register_Details'>
                    <form>
                        <div className="floating-label-group">
                            <input ref={emailRef} onChange={checkEmail} type="email" id="email" className="form-control" required />
                            <label className="floating-label">Email</label>
                        </div>
                        <div className='submit_button'>
                            <button onClick={gotoVerifyEmail} disabled={isDisabled}>Next</button>
                        </div>
                    </form>
                </div>


            </div>

            <div className="Registration_Component_Misc">
                <p>Already have an account? <a href='#!'>Log In.</a></p>
            </div>
        </>

    )
}

export default EmailRegistration
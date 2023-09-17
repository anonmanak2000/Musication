import { ChangeEvent } from 'react'
import { useNavigate, useLocation, NavigateFunction, Location } from 'react-router-dom'
import { useState } from 'react'

function VerifyEmail(): JSX.Element {

    const [isDisabled, setIsDisabled] = useState(true)

    const maxVerificationCodeLen = 6

    const navigate: NavigateFunction = useNavigate()

    const location: Location = useLocation()

    const userEmail: string = location.state?.userEmail

    const checkVerificationCode = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()

        const currentEmail: string = event.target.value

        const expression: RegExp = /^[0-9]{6}/i;

        const result: boolean = expression.test(currentEmail);

        result ? setIsDisabled(false) : setIsDisabled(true)

    }

    const gotoCompleteRegistration = (): void => {

        navigate('/register?state=completeRegistration')

    }

    return (
        <>
            <div className="Registration_Component_Title">
                <h2>Check your inbox for your single-use code.</h2>
                <p>Let's get you verified. We sent an email to <b>{userEmail}</b></p>
            </div>

            <div className="Registration_Component_Input">

                <div className='Register_Details'>
                    <form>
                        <div className="floating-label-group">
                            <input onChange={checkVerificationCode} type="text" id="verificationCode" className="form-control" maxLength={maxVerificationCodeLen} required />
                            <label className="floating-label">Single-use code</label>
                        </div>
                        <div className='submit_button'>
                            <button onClick={gotoCompleteRegistration} disabled={isDisabled}>Submit Code</button>
                        </div>
                    </form>
                </div>


            </div>

            <div className="Registration_Component_Misc">
                <p>Didn't get the email?</p>
                <p>Check your spam folder. If you still can't find it, <a href='#!'>resend the email.</a></p>
            </div>
        </>
    )
}

export default VerifyEmail
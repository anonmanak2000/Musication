import { ChangeEvent, MutableRefObject } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useRef, useState } from 'react'

function VerifyEmail() {

    const verificationCodeRef = useRef() as MutableRefObject<HTMLInputElement>;

    const [isDisabled, setIsDisabled] = useState(true)

    const maxVerificationCodeLen = 6

    const navigate = useNavigate()

    const location = useLocation()

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
                            <input ref={verificationCodeRef} onChange={checkVerificationCode} type="text" id="verificationCode" className="form-control" maxLength={maxVerificationCodeLen} required />
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
import { ChangeEvent, MutableRefObject } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'
import { useRef, useState } from 'react'

function CompleteRegistration(): JSX.Element {

    const firstNameRef: MutableRefObject<HTMLInputElement> = useRef() as MutableRefObject<HTMLInputElement>;

    const lastNameRef: MutableRefObject<HTMLInputElement> = useRef() as MutableRefObject<HTMLInputElement>;

    const [isDisabled, setIsDisabled] = useState(true)

    const navigate: NavigateFunction = useNavigate()


    const checkName = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault()

        const firstName: string = firstNameRef.current?.value

        const lastName: string = lastNameRef.current?.value

        const expression: RegExp = /^[a-zA-Z]+/i;

        const resultFirst: boolean = expression.test(firstName);
        const resultLast: boolean = expression.test(lastName);

        resultFirst ? (resultLast ? setIsDisabled(false) : setIsDisabled(true)) : setIsDisabled(true)


    }

    const gotoCompleteRegistration = (): void => {

        navigate('/main')

    }
    return (
        <>
            <div className="Registration_Component_Title">
                <h2>Hello, Musicophile! What's your name?</h2>
                <p>Knowing who you are makes things go faster. </p>
            </div>

            <div className="Registration_Component_Input">

                <div className='Register_Details'>
                    <form>
                        <div className="floating-label-group">
                            <input ref={firstNameRef} onChange={checkName} type="text" id="firstName" className="form-control" required />
                            <label className="floating-label">First Name</label>
                        </div>
                        <div className="floating-label-group">
                            <input ref={lastNameRef} onChange={checkName} type="text" id="lastName" className="form-control" required />
                            <label className="floating-label">Last Name</label>
                        </div>

                        <div className='submit_button'>
                            <button onClick={gotoCompleteRegistration} disabled={isDisabled}>Next</button>
                        </div>
                    </form>
                </div>


            </div>
        </>
    )
}

export default CompleteRegistration
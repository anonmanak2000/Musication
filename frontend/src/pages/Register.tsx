import { Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import '../styles/Register.css'
import EmailRegistration from '../components/RegistrationComponents/EmailRegistration'
import VerifyEmail from '../components/RegistrationComponents/VerifyEmail'
import CompleteRegistration from '../components/RegistrationComponents/CompleteRegistration'
import { Helmet } from 'react-helmet'
import Musication from '../resources/images/Musication.png'

function Register(): JSX.Element {

    const location = useLocation()

    const registerObject = {
        registerEmail: EmailRegistration,
        verifyEmail: VerifyEmail,
        completeRegistration: CompleteRegistration
    }

    const params: URLSearchParams = new URLSearchParams(location.search)

    const state = (params.get('state') || 'registerEmail') as keyof typeof registerObject

    const CurrentRegistrationStep: () => JSX.Element = registerObject[state]

    return (
        <div className='Registration'>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Musication - Registration</title>
                <link rel="icon" href={Musication} />
            </Helmet>

            <div className='Registration_Component'>

                <Suspense fallback='Loading Data ...'>
                    <CurrentRegistrationStep />
                </Suspense>

            </div>

        </div>
    )
}

export default Register
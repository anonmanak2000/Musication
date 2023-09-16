import { useLocation } from 'react-router-dom'
import '../styles/Register.css'
import EmailRegistration from '../components/RegistrationComponents/EmailRegistration'
import VerifyEmail from '../components/RegistrationComponents/VerifyEmail'
import CompleteRegistration from '../components/RegistrationComponents/CompleteRegistration'

function Register() {

    const location = useLocation()

    const registerObject = {
        registerEmail: <EmailRegistration />,
        verifyEmail: <VerifyEmail />,
        completeRegistration: <CompleteRegistration />
    }

    const params: URLSearchParams = new URLSearchParams(location.search)

    const state = (params.get('state') || 'registerEmail') as keyof typeof registerObject


    return (
        <div className='Registration'>
            <div className='Registration_Component'>
                {registerObject[state]}
            </div>

        </div>
    )
}

export default Register
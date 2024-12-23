import "./signin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import ok from './test.png'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import {useLogin} from '../../hooks/useLogin'
import Action from '../../components/main/actionSuccess'

function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass]=useState(false)
    const {login, error, isLoading,showAction, setAction} = useLogin()

    function handleSubmit(e){
        e.preventDefault()

        login(email, password)
    }

    return (
        <div className="sign-in-container">
             {showAction && <Action value={showAction} onClick={()=>setAction()} isLoading={isLoading} action="Login"/>}
            <img id="logo-signin" src={ok}/>
            <div className="card">
                <div className="left-side">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="right-side">
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="login">
                            <h2 className="text-3xl">User Login</h2>
                        </div>
                        <div className="input_text">
                            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                            <FontAwesomeIcon className="fa" icon={faEnvelope}/>
                        </div>
                        <div className="input_text">
                            <input className="signin_pass" id="passInput" type={showPass?"text":"password"} name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                            <FontAwesomeIcon className="fa" icon={faLock}/>
                            <FontAwesomeIcon className="fa fa-eye" icon={showPass?faEye:faEyeSlash} onClick={()=>setShowPass(!showPass)}/>
                        </div>
                        <div className="login_btn relative">
                            <button id="signup_button" type="submit">LOG IN</button>
                            {error && <p className="absolute -bottom-32 sm:-bottom-12 text-xs px-4 py-2 bg-red-300 border text-white rounded-md border-red-600">{error}</p>}
                        </div>
                        <div className="input_text">
                            {/* login with google */}
                            {/* <GoogleLogin
                                style={{width:"100%"}}
                                clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            /> */}
                        <div className="create margin flex flex-col justify-center items-center">
                            <p>Don't have an account?</p>
                            <Link to="/signup" className="text-orange-900 inline">Create Account</Link>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin;

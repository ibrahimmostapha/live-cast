import "./signup.css";
import ok from './test.png'
import { useState } from "react";
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useSignup } from "../../hooks/useSignup"
import Action from '../../components/main/actionSuccess'


function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [showPass, setShowPass]=useState(false)
  const [showPass2, setShowPass2]=useState(false)
  const {signup, error, isLoading,showAction, setAction} = useSignup()

  const handleSubmit = (e) => {
      e.preventDefault()

      signup(email,firstname,lastname,password,password2)
  }

    return (
        <div className="sign-up-container">
            {showAction && <Action value={showAction} onClick={()=>setAction()} isLoading={isLoading} action="Signup"/>}
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
                            <h2 className="text-3xl">Create Account</h2>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className="input_text" style={{ marginRight: "5px" }}>
                                <FontAwesomeIcon className="fa" icon={faUser}></FontAwesomeIcon>
                                <input type="text" placeholder="First Name" onChange={(e)=>setfirstname(e.target.value)}/>
                            </div>
                            <div className="input_text">
                                <FontAwesomeIcon className="fa" icon={faUser}></FontAwesomeIcon>
                                <input type="text" placeholder="Last Name" onChange={(e)=>setlastname(e.target.value)}/>
                            </div>
                        </div>
                        <div className="input_text">
                            <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                            <FontAwesomeIcon className="fa" icon={faEnvelope}></FontAwesomeIcon>
                        </div>
                        <div className="input_text">
                            <input type={showPass?"text":"password"} className="signup_pass" id="passInput" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                            <FontAwesomeIcon className="fa" icon={faLock}></FontAwesomeIcon>
                            <FontAwesomeIcon className="fa fa-eye" icon={showPass?faEye:faEyeSlash} onClick={()=>setShowPass(!showPass)}/>
                        </div>
                        <div className="input_text">
                            <input type={showPass2?"text":"password"} className="signup_pass" id="passInput2" placeholder="Repeat password" onChange={(e)=>setPassword2(e.target.value)}/>
                            <FontAwesomeIcon className="fa" icon={faLock}></FontAwesomeIcon>
                            <FontAwesomeIcon className="fa fa-eye" icon={showPass2?faEye:faEyeSlash} onClick={()=>setShowPass2(!showPass2)}/>
                        </div>
                        <div className="login_btn relative">
                            <button id="signup_button" type="submit">SIGN UP</button>
                            {error && <p className="absolute -bottom-20 sm:-bottom-14 text-xs px-4 py-2 bg-red-300 border text-white rounded-md border-red-600">{error}</p>}
                        </div>            
                        <div className="create">
                            <p>
                                Already have an account?{" "}
                                <Link to="/signin" className="login_acc"> Sign in</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;

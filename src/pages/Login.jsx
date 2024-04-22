import React, { useState } from 'react'
import Logo from '../components/Logo'
import { NavLink, useNavigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const firebaseConfig = {
    apiKey: "AIzaSyAzVPUt1jqCmUwTfDtg3PsceZl-pEUbo6E",
    authDomain: "discuss-chat-52fb7.firebaseapp.com",
    projectId: "discuss-chat-52fb7",
    storageBucket: "discuss-chat-52fb7.appspot.com",
    messagingSenderId: "71617161259",
    appId: "1:71617161259:web:c75187e79da2a1c41ca26e",
    measurementId: "G-PLSEG901KC"
  };

const app = initializeApp(firebaseConfig);
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email: '',
    password:'',
  });



  const handlerChange = (event) =>{
    const {name, value} = event.target;
    setUserData((preData)=>({
        ...preData,
        [name]:value
    }))
  };

  const emailCheck = () => {
    if(userData.email==null) return setEmailError(true)
    return setEmailError(false)
  }
  const passwordCheck = () => {
    if(userData.password==null || userData.password.length<8) return setPasswordError(true)
    return setPasswordError(false)
  }

  const loginHandler = (e) =>{
    e.preventDefault()
    emailCheck()
    passwordCheck()
    signInWithEmailAndPassword(auth, userData.email, userData.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("logged in successfully")
    setUserData({
      email: '',
      password:'',
    })
    navigate('/')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  }
  return (
    <div className='container-fluid bg-white p-4 card-holder'>
    <div className="card border-0 p-4">
    <Logo/>
      <form onSubmit={loginHandler}>
          <div className="form-group mt-2">
              <label htmlFor="name" className="form-label">Email</label>
              <input type="email" className="form-control" name='email' value={userData.email} placeholder='Enter Email Address' onChange={handlerChange} />
          </div>
          <div className="form-group mt-2">
              <label htmlFor="name" className="form-label">Password</label>
              <input type="password" name='password' className="form-control" value={userData.password} placeholder='Password' onChange={handlerChange}/>
          </div>
          <div className="form-group mt-2">
                <input type="checkbox" />
                <label htmlFor="p_show" className="form-label"> Show Password?</label>
            </div>
         
          <div className="form-group mt-2">
              <p>You don't Remember Password? <NavLink to={'/register'}>Forgot Password?</NavLink></p>
          </div>
          <div className="form-group mt-2">
              <button className="w-100 border-0 p-2 fs-5 bg-primary text-white rounded-3" type='submit'>Sign in</button>
          </div>
          <div className="form-group mt-2">
              <p>You don't have account? <NavLink to={'/register'}>Register</NavLink></p>
          </div>
      </form>
    </div>
  </div>
  )
}

export default Login

import React, { useState } from 'react'
import '../styles/auth.css'
import Logo from '../components/Logo'
import { NavLink, useNavigate } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import RegisterOk from '../components/RegisterOk';



function Register() {
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
    const auth = getAuth();
    
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password:'',
        confirm_password:''
      });
    
      const [firstNameError, setFirstNameError] = useState(false)
      const [emailError, setEmailError] = useState(false)
      const [passwordError, setPasswordError] = useState(false)
      const [confirmPass, setConfirmPass] = useState(false)
      const [isLogin, setIsLogin] = useState(true);

    
      const handlerChange = (event) =>{
        const {name, value} = event.target;
        setUserData((preData)=>({
            ...preData,
            [name]:value
        }))
      };
    
   
      const confirmPasswordCheck = () => {
        if(userData.password != userData.confirm_password) return setConfirmPass(true)
        return setConfirmPass(false)
      }
      const nameCheck = () => {
        if(userData.firstName==null || userData.firstName.length<5) return setFirstNameError(true)
        return setFirstNameError(false)
      }
      const emailCheck = () => {
        if(userData.email==null) return setEmailError(true)
        return setEmailError(false)
      }
      const passwordCheck = () => {
        if(userData.password==null || userData.password.length<8) return setPasswordError(true)
        return setPasswordError(false)
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log('user data submitted:', userData);
        nameCheck()
        emailCheck()
        passwordCheck()
        confirmPasswordCheck()

        createUserWithEmailAndPassword(auth, userData.email, userData.password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            setIsLogin(true)
            setUserData({
                firstName: '',
                lastName: '',
                email: '',
                password:'',
                confirm_password:''
                })
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        
      };
  return (
    <div>
        
        {
            isLogin ? ((
                <RegisterOk/>
            )) : ((
              <div className='container-fluid bg-white p-4 card-holder'>
              <div className="card border-0 p-4">
                <Logo/>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mt-2">
                        <label htmlFor="firstname" className="form-label">First Name</label>
                        <input type="text" className="form-control" name='firstName' placeholder='Ex: John' onChange={handlerChange} value={userData.firstName}/>
                        {
                        firstNameError ?  <p className='text-danger mt-2'>please fill valid name</p> : <></>
                       }
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" name='lastName' placeholder='Ex: Doe' onChange={handlerChange}  value={userData.lastName}/>
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" name='email' placeholder='Ex: Example@gmail.com' onChange={handlerChange}  value={userData.email}/>
                        {
                        emailError ?  <p className='text-danger mt-2'>Enter valid Email Address</p> : <></>
                       }
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' placeholder='Create Password' onChange={handlerChange}  value={userData.password}/>
                        {
                        passwordError ?  <p className='text-danger mt-2'>Password must be 8 charecters length</p> : <></>
                       }
                    </div>
                    
                    <div className="form-group mt-2">
                        <input type="password" className="form-control" name='confirm_password' placeholder='Confirm Password'   onChange={handlerChange}  value={userData.confirm_password}/>
                       {
                        confirmPass ?  <p className='text-danger mt-2'>Confirm Password is not Match.</p> : <></>
                       }
                    </div>
                    <div className="form-group mt-2">
                        <input type="checkbox" />
                        <label htmlFor="p_show" className="form-label"> Show Password?</label>
                    </div>
                  
                    <div className="form-group mt-2">
                        <button type='submit' className="w-100 border-0 p-2 fs-5 bg-primary text-white rounded-3">Sign Up</button>
                    </div>
                    <div className="form-group mt-2">
                        <p>You have an already account? <NavLink to={'/login'}>Login</NavLink></p>
                    </div>
                </form>
              </div>
            </div>
        
              ))
        }
    </div>
  )
}

export default Register

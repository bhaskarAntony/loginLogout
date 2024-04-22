import React from 'react'
import '../styles/successAuth.css'
import {useNavigate } from 'react-router-dom'

function RegisterOk() {
  const navigate = useNavigate()
  return (
    <div className='container-fluid success'>
   <div className='border-0 bg-white text-center dialog'>
    <img src="https://i.pinimg.com/originals/90/13/f7/9013f7b5eb6db0f41f4fd51d989491e7.gif" alt="gif" />
        <h3 className='text-secondary'>Registration is completed successfully</h3>
        <button className="border-0 rounded-3 p-2 text-white fs-5 bg-success mt-4" onClick={()=>navigate('/login')}>Login Now</button>
   </div>
    </div>
  )
}

export default RegisterOk

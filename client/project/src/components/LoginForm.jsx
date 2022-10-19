import React from 'react'
import { useNavigate } from 'react-router-dom'
import expense_picture from '../assets/expense_picture.png'


const LoginForm = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate('/CreateAccount')
  }

  return (
    <> 
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={expense_picture} alt="" />
        </div>

        <div className='bg-gray-100 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-3xl font-bold text-center py-6'>Sign in to your account</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border p-2' type="text" />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2' type="password" />
                </div>
                <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white' onClick={()=>navigate('/Homepage')} >Sign In</button>
                <div className='flex justify-between'>
                    <p className='flex items-center'><input className='mr-2' type="checkbox" /> Remember Me</p>
                    <button className='text-blue-600' onClick={handleClick}>Create an account</button>
                </div>
            </form>
        </div>
    </div>
    </>
      
        
  )
}

export default LoginForm

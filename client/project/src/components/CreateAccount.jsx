import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateAccount = () => {
    const navigate = useNavigate();

  return (
    <>
    <div>
        <div className='bg-gray-100 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-white p-4'>
                <h2 className='text-3xl font-bold text-center py-6'>Sign Up</h2>
                <div className='flex flex-col py-2'>
                    <label>Username</label>
                    <input className='border p-2' type="text" />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Password</label>
                    <input className='border p-2' type="password" />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Confirm your password</label>
                    <input className='border p-2' type="text" />
                </div>
                <div className='flex flex-col py-2'>
                    <label>Email</label>
                    <input className='border p-2' type="text" />
                </div>
                <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Create</button>
        
            </form>
        </div>
    </div>
    </>
  )
}

export default CreateAccount

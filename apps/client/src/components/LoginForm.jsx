import React from 'react'
import { useNavigate } from 'react-router-dom'
import expense_picture from '../assets/expense_picture.png'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const LoginForm = () => {

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = Object.fromEntries(new FormData(event.target));


        fetch("api/users/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {

                if (response.ok) {

                    navigate("/Homepage");
                    window.location.reload("/Homepage");
                } else {
                    setError("Invalid, please try again")
                }
                return response.json()
            })
            .then((data) => {
                localStorage.setItem("userInfo", JSON.stringify(data))
            });
    }

    return (
        <>
            <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                <div className='hidden sm:block'>
                    <img className='w-full h-full flex justify-center object-contain' src={expense_picture} alt="" />
                </div>
                <div className='bg-gray-100 flex flex-col justify-center'>
                    <form className='max-w-[400px] w-full mx-auto bg-white p-4' method='post' onSubmit={handleSubmit}>
                        <h2 className='text-3xl font-bold text-center py-6'>Sign in</h2>
                        <div className='flex flex-col py-2'>
                            <label>Username:</label>
                            <input className='border p-2' name="Username" type="username" />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Password:</label>
                            <input className='border p-2' name="Password" type="password" />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label className='text-red-600'>{error}</label>
                        </div>
                        <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white' >Sign In</button>
                        <div className='flex justify-between'>
                            <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white' onClick={() => navigate("/CreateAccount")}>Create an account</button>
                        </div>
                    </form>
                </div>
            </div>
        </>


    )
}

export default LoginForm

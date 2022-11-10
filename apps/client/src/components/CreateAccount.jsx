import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const CreateAccount = () => {

    const handleClick = () => {
        setShowAlert(false)
        navigate('/')
    }


    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [showalert, setShowAlert] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();


        const data = Object.fromEntries(new FormData(event.target));
        console.log(data);

        fetch("api/CreateAccount", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    setShowAlert(true)
                } else {
                    console.log("Invalid, pls try again")
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
                setError(data.error)
            });

    }


    return (
        <>
            {showalert ? (
                <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                    <p class="font-bold">Account Successfully Created</p>
                    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg onClick={handleClick} class="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                    </span>
                </div>
            ) :
                null}

            <div>
                <div className='bg-gray-100 flex flex-col justify-center'>
                    <form className='max-w-[400px] w-full mx-auto bg-white p-4' method='post' onSubmit={handleSubmit}>
                        <h2 className='text-3xl font-bold text-center py-6'>Sign Up</h2>
                        <div className='flex flex-col py-2'>
                            <label>Username:</label>
                            <input className='border p-2' type="Username" name='Username' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Password:</label>
                            <input className='border p-2' type="password" name='Password' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Confirm your password:</label>
                            <input className='border p-2' type="password" name='ConfirmPassword' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Email:</label>
                            <input className='border p-2' type="Email" name='Email' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label className='text-red-600'>{error}</label>
                        </div>
                        <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Create</button>
                    </form>
                </div>
                <div className='bg-gray-100 max-h-10 flex flex-col justify-center'>
                    <div className='max-w-[400px] w-full mx-auto bg-white p-4'>
                        <a href="/">
                            <button className='w-full border my-5 py-2 bg-gray-600 hover:bg-gray-500 text-white'>Back to Login</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateAccount

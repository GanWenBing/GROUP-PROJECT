import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

const CreateAccount = () => {


    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();


        const data = Object.fromEntries(new FormData(event.target));
        console.log(data);

        fetch("api/CreateAccount", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },// send it to express as JSON file
            body: JSON.stringify(data)
        })
            .then((response) => {
                console.log(response)
                if (response.ok) {
                    //alert('Account created')
                    navigate('/')
                } else {
                    console.log("Invalid, pls try again")
                }
                return response.json()
            })
            .then((data) => {
                //localStorage.setItem("userInfo",JSON.stringify(data)) 
                console.log(data)
                setError(data.error)
            });

    }


    return (
        <>
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
                            <button className='w-full border my-5 py-2 bg-gray-600 hover:bg-gray-500 text-white'>Cancel</button>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateAccount

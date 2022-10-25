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

        fetch("http://localhost:3000/api/CreateAccount", {
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
                    alert('Account created')
                    navigate('/')
                } else {
                    setError("Invalid, please try again")
                }
                return response.json()
            })
            .then((data) => {
                console.log(data)
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
                            <input className='border p-2' type="ConfirmPassword" name='ConfirmPassword' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label>Email:</label>
                            <input className='border p-2' type="Email" name='Email' />
                        </div>
                        <div className='flex flex-col py-2'>
                            <label className='text-red-600'>{error}</label>
                        </div>
                        <button className='border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white'>Create</button>
                        <button className='border w-full my-5 py-2 border-transparent hover:bg-indigo-500 text-black' onClick={()=> navigate("/")}>Cancel</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateAccount

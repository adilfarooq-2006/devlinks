"use client"
import React from 'react'
import { useState } from 'react'

const SignUp = () => {
    const [formData, setformData] = useState([{
        fullname: '',
        username: '',
        email: '',
        password: ''
    }])
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "username": formData.username,
            "fullname": formData.fullname,
            "email": formData.email,
            "password": formData.password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("api/signup", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert("created")
                setformData({
                    fullname: '',
                    username: '',
                    email: '',
                    password: ''
                })
                return response.json();
            })
            .then((result) => console.log(result))
            .catch((error) => {
                alert("Error")
                console.error(error)
            });

    }


    return (
        <div className='text-white min-h-screen flex flex-col items-center justify-center gap-5'>
            <div className='flex flex-col items-center gap-3 bg-neutral-900 rounded-lg p-4'>
                <h1 className='text-4xl font-bold'>SignUp</h1>
                <p>Create your account</p>
                <form className='flex flex-col gap-3' action={handleSubmit}>
                    <input name='fullname' value={formData.fullname} onChange={handleChange} className='bg-neutral-800 p-2 px-3 w-90 rounded-md' type="text" placeholder='Enter your full name' />
                    <input name='username' value={formData.username} onChange={handleChange} className='bg-neutral-800 p-2 px-3 w-90 rounded-md' type="text" placeholder='Enter your @username ' />
                    <input name='email' value={formData.email} onChange={handleChange} className='bg-neutral-800 p-2 px-3 w-90 rounded-md' type="email" placeholder='Enter your email' />
                    <input name='password' value={formData.password} onChange={handleChange} className='bg-neutral-800 p-2 px-3 w-90 rounded-md' type="password" placeholder='Enter your password' />
                    <button className='bg-violet-800 p-2 rounded-md hover:cursor-pointer' type='submit'>SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
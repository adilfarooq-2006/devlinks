"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
  const router = useRouter();

  const [formData, setformData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setformData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "email": formData.email,
      "password": formData.password,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    try {
      const response = await fetch("/api/login", requestOptions);
      const result = await response.json();
      
      if (response.ok) {
        alert('Login successful');
        console.log(result);
        // Redirect to dashboard or handle successful login
        router.push('/dashboard');
      } else {
        alert('Login unsuccessful: ' + result.message);
        console.error(result);
      }
    } catch (error) {
      alert('Login failed. Please try again.');
      console.error('Error:', error);
    }
  }

  return (
    <div className='text-white min-h-screen flex flex-col items-center justify-center gap-5'>
      <div className='flex flex-col items-center gap-3 bg-neutral-900 rounded-lg p-4'>
        <h1 className='text-4xl font-bold'>Login</h1>
        <p>Login with your credentials</p>
        <form className='flex flex-col gap-3'>
          <input name='email' value={formData.email} onChange={handleChange} className='bg-neutral-800 p-2 px-3 w-90 rounded-md' type="email" placeholder='Enter your email' />
          <input name='password' value={formData.password} onChange={handleChange} className='bg-neutral-800 p-2 px-3 w-90 rounded-md' type="password" placeholder='Enter your password' />
          <button onClick={(e) => handleSubmit(e)} className='bg-black border border-black hover:border-neutral-700 p-2 rounded-md hover:cursor-pointer' type='submit'>Login</button>
        </form>
      </div>
    </div>
    
  )

}

export default LoginPage
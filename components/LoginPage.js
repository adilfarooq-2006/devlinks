import React from 'react'

const LoginPage = () => {
  return (
    <div className='text-white min-h-screen flex flex-col items-center justify-center gap-5'>
            <div className='flex flex-col items-center gap-3 bg-neutral-900 rounded-lg p-4'>
                <h1 className='text-4xl font-bold'>Login</h1>
                <p>Login with your credentials</p>
                <form className='flex flex-col gap-3'>
                    <input name='email'  className='bg-neutral-800 p-2 px-3 w-90 rounded-md' type="email" placeholder='Enter your email' />
                    <input name='password' className='bg-neutral-800 p-2 px-3 w-90 rounded-md' type="password" placeholder='Enter your password' />
                    <button className='bg-violet-800 p-2 rounded-md hover:cursor-pointer' type='submit'>Login</button>
                </form>
            </div>
        </div>
  )
}

export default LoginPage
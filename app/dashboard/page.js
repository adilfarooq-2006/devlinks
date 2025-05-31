"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

 


const Dashboard = () => {
    const router = useRouter();
    const handleLogout = async () => {
        await fetch('/api/logout', {
          method: 'POST',
        });
        router.push('/login');
      };
  return (
    <div>
      <h1 className='text-white'>Welcome</h1>
      <button className='bg-white text-black hover:cursor-pointer p-2 px-3' onClick={handleLogout} >Logout</button>
    </div>
  )
}

export default Dashboard

"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [linkName, setLinkName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/user/info');
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          // Redirect to login if not authenticated
          router.push('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
    });
    router.push('/login');
  };

  if (loading) {
    return <div className="text-white min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <>
    <div className='text-white min-h-screen flex flex-col items-center justify-center gap-5'>
    <div className='flex flex-col gap-3 w-100 bg-neutral-900 rounded-lg p-4'>
      <h1 className='font-bold text-2xl text-center'>Welcome  {userData?.fullname}</h1>
      <div className='flex items-center justify-between'>
        <div className="left">
          <p>{userData?.username}</p>
        </div>
        <div className="right">
          <button onClick={handleLogout} className='bg-neutral-800 hover:bg-red-700 hover:cursor-pointer text-white p-2 px-4 rounded-md'>Logout</button>
        </div>
      </div>
      <p>Add a link</p>
      <input 
        className='bg-neutral-800 p-2 rounded-md' 
        type="text" 
        placeholder='Enter name you want' 
        value={linkName}
        onChange={(e) => setLinkName(e.target.value)}
      />
      <input 
        className='bg-neutral-800 p-2 rounded-md' 
        type="text" 
        placeholder='Enter the link' 
        value={linkUrl}
        onChange={(e) => setLinkUrl(e.target.value)}
      />
      <button className='bg-violet-800 rounded-lg p-2'>Add a link</button>
      
      {/* Display user links */}
      {userData?.links && userData.links.map((link, index) => (
        <div key={index} className='bg-neutral-800 rounded-lg p-4'>
          <p>{link.linkName}</p>
          <Link href={link.url}>
            <p className="text-blue-400 hover:underline">{link.url}</p>
          </Link>
        </div>
      ))}

    </div>
    </div>
    </>
  )
}

export default Dashboard

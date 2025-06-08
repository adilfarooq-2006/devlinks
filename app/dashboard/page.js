"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner'
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

  const handleDelete = async() =>{
    
  }

  if (loading) {
    return <div className="text-white min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleAddLink = async () => {
    if (!linkName || !linkUrl) {
      toast('Please enter both link name and URL.');
      return;
    }
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      const raw = JSON.stringify({
        "linkName": linkName,
        "url": linkUrl
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("api/link/add", requestOptions)
        .then((response) => {
          toast("Link added successfully");
          setLinkName('');
          setLinkUrl('');
          return response.json()
        })
        .then((result) => console.log(result))
        .catch((error) => {
          toast("Error adding link");
          console.error(error)
        });
    } catch (error) {

    }

  }

  return (
    <>
      <div className='text-white min-h-screen flex flex-col items-center justify-center gap-5'>
        <div className='flex flex-col gap-3 w-150 bg-neutral-900 rounded-lg p-4'>
          <h1 className='font-bold text-2xl text-center'>Welcome  {userData?.fullname}</h1>
          <p>Your  public profie link:</p>
          <Link target='_blank' href={`/${userData.username}`}><p className="text-neutral-300 hover:text-white hover:underline-offset-4 hover:underline transition-all">{process.env.NEXT_PUBLIC_HOST + '/' + userData.username}</p></Link>
          <div className='flex items-center justify-between'>
            <div className="left">
              <p className='font-semibold'>{userData?.username}</p>
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
          <button onClick={handleAddLink} className='bg-black border border-black hover:border-neutral-700 rounded-lg p-2'>Add a link</button>

          {/* Display user links */}
          {userData?.links && userData.links.map((link, index) => (
            <div key={index} className='bg-neutral-800 rounded-lg p-4 flex justify-between'>
              <div className='w-100'>
                <p className='font-semibold'>{link.linkName}</p>
                <Link target='_blank' href={link.url}>
                  <p className="text-neutral-300 hover:text-white hover:underline-offset-4 hover:underline transition-all">{link.url}</p>
                </Link>
              </div>
              <div>
                <button className='bg-neutral-900 hover:bg-red-700 hover:cursor-pointer text-white p-2 px-4 rounded-md'>Delete</button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default Dashboard

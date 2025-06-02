"use client"
import React from 'react'
import { useEffect, useState } from 'react'
import { use } from 'react'
import Link from 'next/link'


const Page = ({ params }) => {
  const { username } = use(params);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`api/link/${username}`);
      const data = await res.json();
      setUserData(data);
    };
    fetchData();

  }, [])

  return (
    <>
      <div className='flex flex-col justify-center items-center text-white'>

        <div className='flex flex-col rounded-lg items-center justify-center bg-neutral-800 p-4 mt-30 w-120'>
          <div className='flex flex-col items-center justify-center'>
            <div className="circle w-30 h-30 rounded-full bg-white"></div>
            <div className="username mt-2 text-xl font-semibold">{username}</div>
          </div>
           {userData.length === 0 ? (
          <p className="mt-4 text-gray-400">No links found.</p>
        ) : (
          userData.map((link) => (
            <div key={link.url} className="boxes flex flex-col">
              <Link href={link.url} target='_blank'><div className="box1 bg-neutral-900 border border-neutral-900 hover:border-neutral-600 transition-all p-3 mt-3 w-110 py-5 rounded-lg flex items-center justify-center">
                <h1 className='text-xl font-semibold'>{link.linkName}</h1>
              </div>
              </Link>
            </div>
          ))
        )}
        </div>
        <Link href={'/signup'} target='_blank'>
        <div className='mt-20 bg-neutral-400 p-3 px-5 hover:bg-white hover:cursor-pointer rounded-full text-black'>
          <p className='text-lg font-semibold'>Join {username} on DevLinks</p>
        </div>
        </Link>
      </div>
    </>
  )
}

export default Page

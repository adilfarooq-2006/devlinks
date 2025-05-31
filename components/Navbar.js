import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-black sticky top-3 text-white flex justify-between items-center mx-10 p-5 mt-3 rounded-md'>
      <div className="logo">
        <h1 className='text-2xl font-bold' >DevLinks</h1>
      </div>
      <div className="login flex gap-2">
        <Link href='/login'>
          <button className='bg-black border border-neutral-700 hover:cursor-pointer hover:border-neutral-400 hover:text-white text-neutral-300 transition-all p-2 px-4 text-lg rounded-md'>Login</button>
        </Link>
        <Link href='/signup'>
          <button className='bg-white text-black p-2 px-4 text-lg rounded-md hover:cursor-pointer font-medium'>SignUp</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar

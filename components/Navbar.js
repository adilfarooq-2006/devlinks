import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-black border border-neutral-800 sticky top-3 text-white flex justify-between items-center md:mx-10 p-5  rounded-lg'>
       <Link href='/'>
      <div className="logo">
        <h1 className='text-2xl font-bold' >DevLinks</h1>
      </div>
      </Link>
      {/* <div className="navigation">
        <ul className='flex gap-3 text-lg'>
        <Link href='/'>
          <li className='hover:cursor-pointer hover:font-semibold'>Home</li>
          </Link>
          <Link href='/login'>
          <li>About Us</li>
          </Link>
          <Link href='/login'>
          <li>Contact</li>
          </Link>
        </ul>
      </div> */}
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

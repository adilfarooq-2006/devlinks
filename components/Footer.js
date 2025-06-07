import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
    return (
        <div className='text-white border border-neutral-800 md:p-7 p-4 py-7 md:px-18 px-5 flex w-full justify-between'>
            <div>
                <h1 className='text-4xl font-bold'>DevLinks</h1>
                <div>
                    <p className='md:w-1/2 w-5/6 mt-3'>DevLinks is a platform for everyone to collect their all links at one place</p>
                </div>
                <div className='pt-5 md:hidden block'>
                    <p>Copyrights © 2025 Muhammad Adil Farooq</p>
                    <p>All rights reserved</p>
                </div>
                <div>
                </div>

            </div>
            <div className='pt-10 hidden md:block'>
                <p>Copyrights © 2025 Muhammad Adil Farooq</p>
                <p>All rights reserved</p>
            </div>
        </div>
    )
}

export default Footer

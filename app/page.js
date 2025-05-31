import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="main flex items-center justify-center text-white min-h-screen ">
        <div className="flex flex-col items-center ">
          <h1 className="text-7xl font-bold text-center bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text">Your All Links in</h1>
          <h1 className="text-7xl font-bold text-center bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text">One Place!</h1>
          <p className="text-2xl mt-5">Claim your page now!</p>
          <div className="button flex gap-3">
            <Link href='/login'>
              <button className='bg-black mt-5 border border-neutral-700 hover:cursor-pointer hover:border-neutral-400 hover:text-white text-neutral-300 transition-all p-2 px-4 text-lg rounded-md'>Login</button>
            </Link>
            <Link href='/signup'>
              <button className='bg-white mt-5 text-black p-2 px-4 text-lg rounded-md hover:cursor-pointer font-medium'>SignUp</button>
            </Link>
          </div>
        </div>


      </div>

    </>
  );
}

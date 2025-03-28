import React from 'react'


const Navbar = () => {
  return (
    <nav className='flex justify-between p-5 items-center bg-gray-100 w-screen h-[10vh]'>
        <div className='flex gap-2 '>
            <img className='w-10' src="logo.png" alt="logo" />
            <strong className='text-3xl'><a href="#">DONEZO</a></strong>
        </div>

        <div className="text-base flex gap-5 ">
            <a href="/" className='hover:scale-102 hover:underline '>Home</a>
            <a className='flex items-center hover:scale-102 hover:underline ' rel="noopener noreferrer" target='_blank' href="https://github.com/Rahulbabar222/">
                <p className='hidden sm:block px-2'>View code on Github</p>
                <img className='w-7' src="github.png" alt="" />
            </a>
        </div>
    </nav>
)
}

export default Navbar
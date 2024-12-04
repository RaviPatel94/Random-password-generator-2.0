import React, { useState } from 'react'

function Navbar() {
    const [mode, changemode]=useState("/images/darkmode.png")
    

  return (
    <nav className=' fixed flex justify-between w-screen px-4 pt-2'>
        <h1 className='text-3xl text-zinc-300'>RPG</h1>
        <img src={mode} alt="" className='h-9 cursor-pointer rounded-full bg-zinc-400' />
    </nav>
  )
}

export default Navbar
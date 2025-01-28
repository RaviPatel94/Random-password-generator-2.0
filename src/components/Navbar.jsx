import React, { useState } from 'react'
import Themetoggle from './Themetoggle'

function Navbar() {
    const [mode, changemode]=useState("/images/darkmode.png")
    

  return (
    <nav className=' fixed flex justify-between w-screen px-4 pt-2 '>
        <h1 className='text-3xl dark:text-zinc-300 text-black'>RPG 2.0</h1>
        <Themetoggle/>
    </nav>
  )
}

export default Navbar
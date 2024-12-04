import React, { useState, useCallback, useEffect, useRef } from 'react'

function Hero() {

    const [length,setlength]=useState(8);
    const [numallow,setnumberallow]=useState(false);
    const [charallow, setcarallow]=useState(false)
    const [password, setpassword]=useState("")

    const passwordgen=useCallback(()=>{
        let pass=""
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numallow) str+="0123456789"
        if(charallow) str+="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"

        for (let i = 1; i <= length; i++) {
            let char=Math.floor(Math.random()*str.length+1)
            pass+=str.charAt(char)
        }
        setpassword(pass)

    },[length, numallow, charallow, setpassword])

    const copypass=()=>{
        passwordref.current?.select()
        window.navigator.clipboard.writeText(password)
    }

    useEffect(()=>{passwordgen()},
    [length, numallow, charallow, passwordgen]
    )

    const passwordref = useRef(null)

  return (
    <div >
    <main className='h-screen w-screen flex flex-col gap-12 items-center justify-center bg-white dark:bg-black'>
    <h1 className='text-5xl text-black dark:text-zinc-300 '>Random password generator</h1>
    <div className='flex flex-col gap-3'>
    <div className=' flex gap-3'>
    <input type="text"
     value={password}
     readOnly
     className='bg-zinc-300 rounded-md h-9 w-80 text-black text-lg outline-none pl-2 selection:bg-black selection:text-white'/>
    <button 
    onClick={copypass}
    className='h-9 bg-zinc-300 text-black active:bg-black active:text-zinc-300'>Copy</button>
    </div>
    <div className='flex items-center justify-center'>
      <input type="range" name='length' 
      min={4}
      max={30}
      value={length}
      ref={passwordref}
      onChange={(e)=>{setlength(e.target.value)}}
      id="length" className='cursor-grab accent-zinc-300' />
      <label htmlFor="length" className='text-lg ml-1 text-black dark:text-zinc-300'>Length({length})</label>
      <input type="checkbox" name="numbers" defaultChecked={numallow} onChange={(e)=>{setnumberallow((prev)=>!prev)}} id="numbers" className='ml-4 mt-1 cursor-pointer accent-zinc-300' />
      <label htmlFor="numbers" className='text-lg ml-1 text-black dark:text-zinc-300'>Numbers</label>
      <input type="checkbox" name="Symbols" id="Symbols" defaultChecked={charallow} onChange={(e)=>{setcarallow((prev)=>!prev)}} className='ml-4 mt-1 cursor-pointer accent-zinc-300' />
      <label htmlFor="Symbols" className='text-lg ml-1 text-black dark:text-zinc-300'>Symbols</label>
    </div>
    </div>
    </main>
    </div>
  )
}

export default Hero
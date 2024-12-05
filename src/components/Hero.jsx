import React, { useState, useCallback, useEffect, useRef } from 'react'
import {QRCodeSVG} from "qrcode"

function Hero() {

    const [length,setlength]=useState(8);
    const [numallow,setnumberallow]=useState(false);
    const [numonly,setnumberonly]=useState(false);
    const [charallow, setcarallow]=useState(false)
    const [charonly, setcaronly]=useState(false)
    const [password, setpassword]=useState("")
    const [copystatus,setcopy]=useState("Copy")

    const handlecopy=()=>{
      setcopy("Copied")
    }
    useEffect(()=>{
      setcopy("Copy")
    },[length, numallow, charallow, charonly, numonly, setpassword])

    const passwordgen=useCallback(()=>{
        let pass=""
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numallow) str+="0123456789"
        if(charallow) str+="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
        if(numonly) {
          str="0123456789"; }
        if(charonly) {
          str="!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"; }
        for (let i = 1; i <= length; i++) {
            let char=Math.floor(Math.random()*str.length+1)
            pass+=str.charAt(char)
        }
        setpassword(pass)

    },[length, numallow, charallow,numonly, charonly, setpassword])

    const copypass=()=>{
        passwordref.current?.select()
        window.navigator.clipboard.writeText(password)
    }

    useEffect(()=>{passwordgen()},
    [length, numallow, charallow,numonly, charonly, passwordgen]
    )

    const passwordref = useRef(null)

  return (
    <div >
    <main className='h-screen w-screen flex flex-col gap-12 items-center justify-center bg-white dark:bg-black'>
    <h1 className='text-4xl text-center sm:text-5xl text-black dark:text-zinc-300 '>Random password generator</h1>
    <div className='flex flex-col items-center gap-3'>
    <div className=' flex gap-3 pb-1'>
    <input type="text"
     value={password}
     readOnly
     className='bg-zinc-300 rounded-md h-9 w-60 sm:w-80 text-black text-lg outline-none pl-2 selection:bg-black selection:text-white'/>
    <button 
    onClick={()=>{copypass(); handlecopy();}}
    className='h-9 bg-zinc-300 text-black active:bg-black active:text-zinc-300'>{copystatus}</button>
    </div>
    <div className='flex flex-col sm:flex-row items-center justify-center gap-2'>
      <div className='flex'>
      <input type="range" name='length' 
      min={4}
      max={30}
      value={length}
      ref={passwordref}
      onChange={(e)=>{setlength(e.target.value)}}
      id="length" className=' w-44 sm:w-32 cursor-grab accent-zinc-300' />
      <label htmlFor="length" className='text-lg ml-1 text-black dark:text-zinc-300'>Length({length})</label>
      </div>
      <div >
      <input type="checkbox" name="numbers" defaultChecked={numallow} onChange={(e)=>{setnumberallow((prev)=>!prev)}} id="numbers" className=' size-4 ml-4 mt-1 cursor-pointer accent-zinc-300' />
      <label htmlFor="numbers" className=' text-lg ml-1 text-black dark:text-zinc-300'>Numbers</label>
      <input type="checkbox" name="Symbols" id="Symbols" defaultChecked={charallow} onChange={(e)=>{setcarallow((prev)=>!prev)}} className=' size-4 ml-4 mt-1 cursor-pointer accent-zinc-300' />
      <label htmlFor="Symbols" className='text-lg ml-1 text-black dark:text-zinc-300'>Symbols</label>
      </div>
    </div>
    <div className='flex gap-3 flex-col items-center sm:flex-row' >
      <div className='flex items-center'>
      <input type="checkbox" name="numbersonly" defaultChecked={numonly} onChange={(e)=>{setnumberonly((prev)=>!prev)}} id="numbersonly" className=' size-4 ml-4 mt-1 cursor-pointer accent-zinc-300' />
      <label htmlFor="numbersonly" className=' text-lg ml-1 text-black dark:text-zinc-300'>Numbers only</label>
      <input type="checkbox" name="Symbolsonly" id="Symbolsonly" defaultChecked={charonly} onChange={(e)=>{setcaronly((prev)=>!prev)}} className=' size-4 ml-4 mt-1 cursor-pointer accent-zinc-300' />
      <label htmlFor="Symbolsonly" className='text-lg ml-1 text-black dark:text-zinc-300'>Symbols only</label>
      </div>
      <div>
        <button className=' text-black bg-zinc-200 dark:text-white dark:bg-zinc-800  hover:border border-zinc-900 active:bg-zinc-700 active:text-zinc-100 dark:active:bg-white dark:active:text-black  ' >QR Code</button>
      </div>
      </div>
    </div>
    </main>
    </div>
  )
}

export default Hero
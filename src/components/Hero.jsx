import React, { useState, useCallback, useEffect, useRef } from 'react'
import QRCode from 'react-qr-code';
import { toPng } from "html-to-image";


function Hero() {

    const [length,setlength]=useState(8);
    const [numallow,setnumberallow]=useState(false);
    const [numonly,setnumberonly]=useState(false);
    const [charallow, setcarallow]=useState(false)
    const [charonly, setcaronly]=useState(false)
    const [password, setpassword]=useState("")
    const [copystatus,setcopy]=useState("Copy")
    const [qrcode,genqrcode]=useState("")
    const [strength, setstrength] = useState("weak")
    const [dqr, setdqr] = useState(false)
    const timeref=useRef(0)

    const handlecopy=()=>{
      setcopy("Copied")
    }
    useEffect(()=>{
      setcopy("Copy")
    },[length, numallow, charallow, charonly, numonly, setpassword])

    const checkPasswordStrength = (password) => {
      let score = 0;
      
      if (password.length >= 8) score += 1;
      if (password.length >= 12) score += 1;
      if (password.length >= 16) score += 1;

      if (/[0-9]/.test(password)) score += 1;
      if (/[a-z]/.test(password)) score += 1;
      if (/[A-Z]/.test(password)) score += 1;
      if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

      if (score <= 2) return "WEAK";
      if (score <= 4) return "MEDIUM";
      if (score <= 6) return "STRONG";
      return "VERY STRONG";
  }

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
        setstrength(checkPasswordStrength(pass))

    },[length, numallow, charallow,numonly, charonly, setpassword])

    const copypass=()=>{
        passwordref.current?.select()
        window.navigator.clipboard.writeText(password)
    }

    useEffect(()=>{passwordgen()},
    [length, numallow, charallow,numonly, charonly, passwordgen]
    )

    const passwordref = useRef(null);

    function generateqr(){
      console.log(timeref.current)
      if (timeref.current===0) {
        setdqr(true)
        timeref.current++
        genqrcode(
          <div className=' flex flex-col gap-4 items-center justify-center'>
          <div ref={qrRef} className='p-1 bg-white'>
          <QRCode
          value={password}
          type='string'
          size={200}
          />
          </div>
          <button 
          className=' text-black bg-zinc-200 dark:text-white dark:bg-zinc-800  hover:border border-zinc-900 active:bg-zinc-700 active:text-zinc-100 dark:active:bg-white dark:active:text-black dark:hover:border-white'
          onClick={downloadQRCode}
          >Download QR</button>
          </div>
          )
      }else{
        setdqr(false)
        timeref.current=0
        generateqr(" ")
      }
    }

    const qrRef = useRef();

    const downloadQRCode = async () => {
      if (!qrRef.current) return;
  
      try {
        const dataUrl = await toPng(qrRef.current);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      } catch (err) {
        console.error("Failed to download QR code:", err);
      }
    };

  return (
    <div >
    <main className='min-h-screen pt-7 w-screen flex flex-col gap-12 items-center justify-center bg-white dark:bg-black'>
    <h1 className='text-4xl text-center sm:text-5xl text-black dark:text-zinc-300 '>Random password generator</h1>
    <div className='flex flex-col sm:flex-row items-center gap-5'>
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
      <div className='text-lg ml-1 text-black dark:text-zinc-300 underline' >{strength}</div>
    </div>
    <div className='flex gap-3 flex-col items-center sm:flex-row' >
      <div className='flex items-center'>
      <input type="checkbox" name="numbersonly" defaultChecked={numonly} onChange={(e)=>{setnumberonly((prev)=>!prev)}} id="numbersonly" className=' size-4 ml-4 mt-1 cursor-pointer accent-zinc-300' />
      <label htmlFor="numbersonly" className=' text-lg ml-1 text-black dark:text-zinc-300'>Numbers only</label>
      <input type="checkbox" name="Symbolsonly" id="Symbolsonly" defaultChecked={charonly} onChange={(e)=>{setcaronly((prev)=>!prev)}} className=' size-4 ml-4 mt-1 cursor-pointer accent-zinc-300' />
      <label htmlFor="Symbolsonly" className='text-lg ml-1 text-black dark:text-zinc-300'>Symbols only</label>
      </div>
      <div>
        <button className=' text-black bg-zinc-200 dark:text-white dark:bg-zinc-800  hover:border border-zinc-900 active:bg-zinc-700 active:text-zinc-100 dark:active:bg-white dark:active:text-black dark:hover:border-white '
        onClick={generateqr}
        >{dqr?"Hide QR":"QR Code"}</button>
      </div>
      </div>
    </div>
    {qrcode}
    </div>
    </main>
    </div>
  )
}

export default Hero
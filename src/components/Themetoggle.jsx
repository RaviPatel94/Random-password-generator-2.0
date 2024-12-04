import { useEffect, useState } from "react"
import {FaMoon} from "react-icons/fa";
import {BsSunFill} from "react-icons/bs";


const Themetoggle = () => {
    const [darkmode,setmode]=useState(false)
    useEffect(()=>{
        const theme=localStorage.getItem("theme")
        if (theme==="dark") setmode(true)
    },[])
    useEffect(()=>{
        if(darkmode){
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme","dark")
        } else{
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme","light")
        }
    },[darkmode])
  return (
    <div className=" relative w-16 h-9 flex items-center cursor-pointer rounded-full bg-zinc-400 dark:bg-gray-700 p-1"
    onClick={()=>setmode(!darkmode)}>
       <FaMoon className="text-white" size={18}/>
       <div className=" absolute h-6 w-6 rounded-full bg-white dark:bg-zinc-500 transform transition-transform duration-300 "
       style={darkmode ? {right:"2px"}:{left:"2px"}}
       ></div>
       <BsSunFill
       className="ml-auto text-yellow-400"
       size={18}
       />
    </div>
  )
}

export default Themetoggle
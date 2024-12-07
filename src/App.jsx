import { useState , useCallback, useEffect, useRef, createContext} from 'react'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'


function App() {

  return (
    <>
    <Navbar/>
    <Hero/>
    </>
  )
}

export default App

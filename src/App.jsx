import { useState , useCallback, useEffect, useRef, createContext} from 'react'
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


function App() {

  return (
    <>
    <Navbar/>
    <Hero/>
    <Footer/>
    </>
  )
}

export default App

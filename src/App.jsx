import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuroraHero } from './components/Landing'
import SideNavbar from './components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuroraHero/>
      <SideNavbar/>
    </>
  )
}

export default App

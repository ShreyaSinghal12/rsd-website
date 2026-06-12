import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'

export default function App() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  return (
    <>
      <Navbar />
      <main>
        <Home />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
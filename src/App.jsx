import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import Home from './pages/Home'
import CategoryPage from './pages/CategoryPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/residential" element={<CategoryPage category="residential" />} />
          <Route path="/projects/hospitality" element={<CategoryPage category="hospitality" />} />
          <Route path="/projects/builders" element={<CategoryPage category="commercial" />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}